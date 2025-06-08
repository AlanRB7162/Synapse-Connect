import { Router } from 'express';
import bcrypt from 'bcrypt';
import db from '../db';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { ResultSetHeader } from 'mysql2';
import { redirectWithToast } from '../utils/redirectWithToast';

dotenv.config();

const router = Router();

router.post('/register', async (req, res) => {
    const { nome, username, email, senha } = req.body;
    const provider = 'local';

    if (!nome || !username || !email || !senha) {
        return redirectWithToast(res, {
            title: "Erro ao registrar",
            description: "Todos os campos devem ser preenchidos."
        })
    }

    try {
        // Verificar se já existe algum usuário com mesmo username (independente do provider)
        const [usernameExists] = await db.promise().query(
            `SELECT * FROM Usuario WHERE username = ?`, [username] 
        );
        if((usernameExists as any[]).length > 0){
            return res.status(400).json({
                error: "Este nome de usuário já está em uso",
                field: 'username',
            });
        }

        // Verificar se já existe email para provider = 'local' (mesmo provider)
        const [emailExists] = await db.promise().query(
            `SELECT * FROM Usuario WHERE email = ? AND provider = ?`, [email, provider]
        );
        if((emailExists as any[]).length > 0){
            return res.status(400).json({
                error: 'Este e-mail já está em uso.',
                field: 'email',
            });
        }

        // 🔐 Hash da senha
        const hashedPassword = await bcrypt.hash(senha, 10);

        const [result] = await db.promise().query<ResultSetHeader>(
            `INSERT INTO Usuario (nome, username, email, senha, provider) VALUES (?, ?, ?, ?, ?)`,
            [nome, username, email, hashedPassword, provider]
        );

        const userId = result.insertId;

        const token = jwt.sign(
            { id: userId, username },
            process.env.JWT_SECRET as string,
            { expiresIn: '7d' }
        );

        console.log('Usuário LOCAL registrado com sucesso:', {
            nome,
            username,
            email,
        });

        return res.status(200).json({ 
            message: 'Registro LOCAL realizado com sucesso.',
            token, 
            user: {
                id: userId, 
                nome,
                email,
                username,
            }
        });
    } catch (err: any) {
        if (err.message.includes('hash')){
            return res.status(500).json({ error: 'Erro ao processar senha.'});
        }

        console.error('Erro ao registrar usuário:', err);
        return res.status(500).json({ error: 'Erro interno no servidor' });
    }
});

router.post('/login', async (req, res) => {
    const  { loginInput, senha } = req.body;

    if(!loginInput || !senha) {
        return res.status(400).json({
            error: 'Usuário/e-mail e senha são obrigatórios.',
        });
    }

    try{
        const [results] = await db.promise().query(
            `SELECT * FROM Usuario WHERE email = ? OR username = ?`, 
            [loginInput, loginInput]
        );

        if((results as any[]).length === 0){
            return res.status(401).json({
                error: 'Usuário não encontrado',
                field: 'loginInput',
            });
        }

        const user = (results as any[])[0];

        if(!user.senha){
            return res.status(401).json({
                error: 'Usuário cadastrado via provedor externo, use o login social.'
            });
        }

        const isPasswordValid = await bcrypt.compare(senha, user.senha);

        if(!isPasswordValid){
            return res.status(401).json({
                error: 'Senha incorreta',
                field: 'senha',
            });
        }

        const token = jwt.sign(
            { id: user.id, username: user.username },
            process.env.JWT_SECRET as string,
            { expiresIn: '7d' } // expira em 7 dias
        );

        console.log('Login realizado com sucesso:',{
            id: user.id,
            email: user.email,
            username: user.username,
        });

        return res.status(200).json({
            message: 'Login realizado com sucesso.',
            token,
            user: {
                id: user.id,
                nome: user.nome,
                username: user.username,
                email: user.email,
                avatar: user.avatar,
                provider: user.provider,
                providerId: user.providerId
            },
        });
    } catch (err) {
        console.error('Erro na validação de login:', err);
        return res.status(500).json({
            error: 'Erro interno no servidor'
        })
    }
});

export default router;