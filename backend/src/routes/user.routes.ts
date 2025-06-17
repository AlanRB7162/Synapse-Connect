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

    const nomeTrim = nome.trim();
    const usernameTrim = username.trim().toLowerCase();
    const emailTrim = email.trim().toLowerCase();
    const senhaRaw = senha;
    const senhaTrim = typeof senhaRaw === 'string' ? senhaRaw.trim() : '';

    const wantsJson = req.headers.accept?.includes('application/json');

    if (!nomeTrim || !usernameTrim || !emailTrim || !senhaTrim) {
        return redirectWithToast(res, {
            title: "Erro ao registrar",
            description: "Por favor, preencha todos os campos.",
            json: wantsJson
        })
    }

    if (usernameTrim.length < 3 || usernameTrim.length > 20) {
        return redirectWithToast(res, {
            title: "Nome de usuário inválido",
            description: "O nome de usuário deve ter entre 3 e 20 caracteres.",
            json: wantsJson
        });
    }

    const usernameRegex = /^[a-zA-Z0-9_.-]+$/;
        if (!usernameRegex.test(usernameTrim)) {
        return redirectWithToast(res, {
            title: "Nome de usuário inválido",
            description: "Use apenas letras, números, pontos, traços ou underlines no nome de usuário.",
            json: wantsJson
        });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailTrim)) {
        return redirectWithToast(res, {
            title: "E-mail inválido",
            description: "Por favor, informe um endereço de e-mail válido.",
            json: wantsJson
        });
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

    if (!passwordRegex.test(senhaTrim)) {
        return redirectWithToast(res, {
            title: "Senha fraca",
            description: "A senha deve ter pelo menos 8 caracteres, incluindo uma letra maiúscula, um número e um caractere especial.",
            json: wantsJson
        });
    }

    try {
        // Verificar se já existe algum usuário com mesmo username (independente do provider)
        const [usernameExists] = await db.promise().query(
            `SELECT * FROM Usuario WHERE username = ?`, [usernameTrim] 
        );
        if((usernameExists as any[]).length > 0){
            return redirectWithToast(res, {
                title: "Nome de usuário indisponível",
                description: "Esse nome de usuário já está em uso. Por favor, escolha outro.",
                json: wantsJson
            })
        }

        // Verificar se já existe email para provider = 'local' (mesmo provider)
        const [emailExists] = await db.promise().query(
            `SELECT * FROM Usuario WHERE email = ? AND provider = ?`, [emailTrim, provider]
        );
        if((emailExists as any[]).length > 0){
            return redirectWithToast(res, {
                title: "E-mail já cadastrado",
                description: "Esse e-mail já está registrado. Faça login ou use outro e-mail.",
                json: wantsJson
            })
        }

        // 🔐 Hash da senha
        let hashedPassword;
        try{
            hashedPassword = await bcrypt.hash(senhaTrim, 10);
        } catch (hashError) {
            return redirectWithToast(res, {
                title: "Erro interno",
                description: "Não foi possível processar sua senha. Tente novamente mais tarde.",
                json: wantsJson
            });
        }

        const [result] = await db.promise().query<ResultSetHeader>(
            `INSERT INTO Usuario (nome, username, email, senha, provider) VALUES (?, ?, ?, ?, ?)`,
            [nomeTrim, usernameTrim, emailTrim, hashedPassword, provider]
        );

        const userId = result.insertId;

        const token = jwt.sign(
            { 
                id: userId, 
                username: usernameTrim,
                nome: nomeTrim,
                email: emailTrim,
                avatar: null,
                provider: "local",
                providerId: null
            },
            process.env.JWT_SECRET as string,
            { expiresIn: '7d' }
        );

        return res.json({ token, source: "register" });
    } catch (err: any) {
        console.error('Erro ao registrar usuário:', err);
        return redirectWithToast(res, {
            title: "Erro no servidor",
            description: "Ocorreu um problema ao registrar sua conta. Por favor, tente novamente mais tarde.",
            json: wantsJson
        })
    }
});

router.post('/login', async (req, res) => {
    const  { loginInput, senha } = req.body;
    const provider = "local";

    const loginTrim = loginInput.trim();
    const senhaTrim = typeof senha === 'string' ? senha.trim() : '';

    const wantsJson = req.headers.accept?.includes('application/json');

    const isEmail = /\S+@\S+\.\S+/.test(loginTrim);

    if(!loginTrim || !senhaTrim) {
        return redirectWithToast(res, {
            title: "Campos obrigatórios",
            description: "Preencha seu e-mail ou nome de usuário e a senha para continuar.",
            json: wantsJson
        })
    }

    try{
        let results; 
        if(isEmail) {
            [results] = await db.promise().query(
                `SELECT * FROM Usuario WHERE email = ? AND provider = ?`, 
                [loginTrim, provider]
            );
        } else {
            [results] = await db.promise().query(
                `SELECT * FROM Usuario WHERE username = ?`,
                [loginTrim]
            );
        }

        if((results as any[]).length === 0){
            return redirectWithToast(res, {
                title: "Conta não encontrada",
                description: "Não encontramos sua conta. Confira os dados ou crie uma nova.",
                json: wantsJson
            })
        }

        const user = (results as any[])[0];

        if(!user.senha){
            return redirectWithToast(res, {
                title: "Login inválido",
                description: "Essa conta foi cadastrada via provedor externo. Use a opção de login social.",
                json: wantsJson,
                type: "warning"
            })
        }

        const isPasswordValid = await bcrypt.compare(senhaTrim, user.senha);

        if(!isPasswordValid){
            return redirectWithToast(res, {
                title: "Senha incorreta",
                description: "Verifique sua senha e tente novamente.",
                json: wantsJson,
                type: "warning"
            })
        }

        const token = jwt.sign(
            { 
                id: user.id, 
                username: user.username,
                nome: user.nome,
                email: user.email,
                avatar: user.avatar,
                provider: "local",
                providerId: null
            },
            process.env.JWT_SECRET as string,
            { expiresIn: '7d' }
        );

        return res.json({ token, source: "login" })
    } catch (err) {
        console.error('Erro na validação de login:', err);
        return redirectWithToast(res, {
            title: "Erro no servidor",
            description: "Ocorreu um problema ao fazer login com a sua conta. Por favor, tente novamente mais tarde.",
            json: wantsJson
        })
    }
});

router.put('/update', async (req, res) => {
    const wantsJson = req.headers.accept?.includes('application/json');

    try {
        const { id, nome, username } = req.body;

        const nomeTrim = nome.trim();
        const usernameTrim = username.trim().toLowerCase();

        if (!nomeTrim || !usernameTrim) {
            return redirectWithToast(res, {
                title: "Campos obrigatórios",
                description: "Preencha todos os campos obrigatórios.",
                json: wantsJson
            })
        }

        if (usernameTrim.length < 3 || usernameTrim.length > 20) {
            return redirectWithToast(res, {
                title: "Nome de usuário inválido",
                description: "O nome de usuário deve ter entre 3 e 20 caracteres.",
                json: wantsJson
            });
        }

        const usernameRegex = /^[a-zA-Z0-9_.-]+$/;
        if (!usernameRegex.test(usernameTrim)) {
            return redirectWithToast(res, {
                title: "Nome de usuário inválido",
                description: "Use apenas letras, números, pontos, traços ou underlines no nome de usuário.",
                json: wantsJson
            });
        }


        try {
            // Verificar se o username já está em uso por outro usuário
            const [usernameExists] = await db.promise().query(
                `SELECT * FROM Usuario WHERE username = ? AND id != ?`, 
                [usernameTrim, id]
            );
            if ((usernameExists as any[]).length > 0) {
                return redirectWithToast(res, {
                    title: "Nome de usuário indisponível",
                    description: "Esse nome de usuário já está em uso. Por favor, escolha outro.",
                    json: wantsJson
                });
            }


        } catch (err) {
            console.error('Erro ao verificar disponibilidade do username:', err);
            return redirectWithToast(res, {
                title: "Erro no servidor",
                description: "Ocorreu um problema ao verificar o nome de usuário. Por favor, tente novamente mais tarde.",
                json: wantsJson
            });
        }


        await db.promise().query(
            `UPDATE Usuario SET nome = ?, username = ? WHERE id = ?`,
            [nomeTrim, usernameTrim, id]
        );

        return res.json({ message: "Usuário atualizado com sucesso!" });
    
    } catch ( err: any) {
        console.error('Erro ao atualizar usuário:', err);
        return redirectWithToast(res, {
            title: "Erro no servidor",
            description: "Ocorreu um problema ao atualizar seu perfil. Por favor, tente novamente mais tarde.",
            json: wantsJson
        })
    }
});

router.delete('/delete', async (req, res) => {
    try {
        const { id } = req.body;

        await db.promise().query(
            `DELETE FROM Usuario WHERE id = ?`,
            [id]
        );

        return res.json({ message: "Usuário deletado com sucesso!" });
    } catch (err: any) {
        console.error('Erro ao deletar usuário:', err);
        const wantsJson = req.headers.accept?.includes('application/json');
        return redirectWithToast(res, {
            title: "Erro no servidor",
            description: "Ocorreu um problema ao deletar sua conta. Por favor, tente novamente mais tarde.",
            json: wantsJson
        });
    }

});

router.get('/:identificador', async (req, res) => {
  const { identificador } = req.params;

  try {
    let query = '';
    let params: (string | number)[] = [];

    if (/^\d+$/.test(identificador)) {
      // identificador é só dígitos, tratar como id numérico
      query = `SELECT id, nome, username, email, avatar, provider FROM Usuario WHERE id = ?`;
      params = [Number(identificador)];
    } else {
      // tratar como username, lowercase
      query = `SELECT id, nome, username, email, avatar, provider FROM Usuario WHERE username = ?`;
      params = [identificador.toLowerCase()];
    }

    const [rows] = await db.promise().query<any[]>(query, params);

    if (rows.length === 0) {
      return res.status(404).json({ mensagem: 'Usuário não encontrado' });
    }

    return res.json(rows[0]);
  } catch (err) {
    console.error('Erro ao buscar usuário:', err);
    return res.status(500).json({ mensagem: 'Erro interno do servidor' });
  }
});

// GET /usuarios/:id/avatar
router.get('/:id/avatar', async (req, res) => {
  const userId = req.params.id;

  try {
    const [rows] = await db.promise().query<any[]>('SELECT avatar FROM Usuario WHERE id = ?', [userId]);

    if (rows.length === 0) {
      return res.status(404).json({ mensagem: 'Usuário não encontrado' });
    }

    const avatar = rows[0].avatar;
    return res.json({ avatar });
  } catch (err) {
    console.error('Erro ao buscar avatar do usuário:', err);
    return res.status(500).json({ mensagem: 'Erro interno do servidor' });
  }
});

export default router;