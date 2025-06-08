import { Router } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import axios from 'axios';
import db from '../db';
import { ResultSetHeader } from 'mysql2';
import { redirectWithToast } from '../utils/redirectWithToast';

dotenv.config();
const router = Router();

async function generateUniqueUsername(desiredUsername: string, providerSuffix: string): Promise<string> {
  let [rows] = await db.promise().query(
    `SELECT * FROM Usuario WHERE username = ?`, [desiredUsername]
  );
  if ((rows as any[]).length === 0){
    return desiredUsername;
  }
  let baseUsername = desiredUsername + providerSuffix;
  let username = baseUsername;
  let suffixNumber = 0;
  while(true){
    [rows] = await db.promise().query(
      "SELECT * FROM Usuario WHERE username = ?",
      [username]
    );
    if((rows as any[]).length === 0){
      return username
    }suffixNumber++;
    username = baseUsername + suffixNumber;
  }
}

router.get("/github/callback", async (req, res) => {
  const code = req.query.code as string;

  if (!code) {
    return redirectWithToast(res, {
      title: "Erro no login",
      description: "Código de autenticação ausente."
    });
  }

  try{
    const tokenRes = await axios.post(
      `https://github.com/login/oauth/access_token`,
      {
        client_id: process.env.CLIENT_ID_GITHUB,
        client_secret: process.env.CLIENT_SECRET_GITHUB,
        code,
      },
      {
        headers: {accept: "application/json"},
      }
    );

    if (!tokenRes.data || !tokenRes.data.access_token){
      return redirectWithToast(res, {
        title: "Erro na autenticação com o GitHub",
        description:"Não foi possível obter o token de acesso."
      })
    }

    const access_token = tokenRes.data.access_token;

    if(!access_token){
      return redirectWithToast(res, {
        title: "Erro no GitHub",
        description: "Token de acesso não foi recebido."
      })
    }

    //pegar os dados do usuário
    const userRes = await axios.get("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    //pegar e-mail do usuário
    let email: string | null = null;
    try{
      const emailRes = await axios.get("https://api.github.com/user/emails",{
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
      email = emailRes.data.find((emailObj: any) => emailObj.primary && emailObj.verified)?.email || null;
    } catch (emailErr) {
      console.warn("Não foi possível obter o e-mail do usuário GitHub:", emailErr);
    }

    const {id: githubId, login, name, avatar_url} = userRes.data;

    //preparar os dados antes de usá-los
    const nome = (name || login).trim();
    const username = await generateUniqueUsername(login.trim(), '_gh')
    const avatar = avatar_url?.trim() || null;
    const providerId = githubId?.toString();

    if (!githubId || !login){
      return redirectWithToast(res, {
        title: "Erro nos dados do GitHub",
        description: "Informações essenciais do usuário não foram recebidas."
      })
    }

    //verificando se usuário já está cadastrado no banco de dados
    const [rowsByProviderId] = await db.promise().query<any[]>(
      "SELECT * FROM Usuario WHERE provider_id = ? AND provider = 'github'",
      [providerId]
    );

    let user: any;

    if(rowsByProviderId.length > 0){
      // Usuário já existe pelo provider_id, usar ele
      user = rowsByProviderId[0];
    } else{
      // Usuário não existe pelo provider_id, verificar se o email já está cadastrado para esse provider
      if(email){
        const [rowsByEmail] = await db.promise().query<any[]>(
          "SELECT * FROM Usuario WHERE email = ? AND provider = 'github'", [email]
        );

        if(rowsByEmail.length > 0){
          // Email já cadastrado para este provider, usar esse usuário (login)
          user = rowsByEmail[0];
        }else{
          // Email não cadastrado, inserir novo usuário
          try{
            const [result] = await db.promise().query<ResultSetHeader>(
              "INSERT INTO Usuario (nome, email, username, avatar, provider, provider_id) VALUES (?, ?, ?, ?, 'github', ?)",
              [nome, email, username, avatar, providerId]
            );
            user = {
              id: result.insertId,
              nome, username, email, avatar
            }
          } catch (err) {
            console.error("Erro ao cadastrar novo usuário:", err);
            return redirectWithToast(res, {
              title: "Erro interno",
              description: "Não foi possível criar o usuário. Tente novamente mais tarde."
            });
          }
        }
      } else {
        // Email não disponível (null), inserir usuário novo baseado no provider_id
        try{
          const [result] = await db.promise().query<ResultSetHeader>(
            "INSERT INTO Usuario (nome, email, username, avatar, provider, provider_id) VALUES (?, ?, ?, ?, 'github', ?)",
            [nome, email, username, avatar, providerId]
          );
          user = {
            id: result.insertId,
            nome, username, email, avatar
          }
        } catch (err){
          console.error("Erro ao cadastrar novo usuário:", err);
          return redirectWithToast(res, {
            title: "Erro interno",
            description: "Não foi possível criar o usuário. Tente novamente mais tarde."
          });
        }
      }
    }

    //criação do token jwt com os dados do usuário logado
    const token = jwt.sign(
      { 
        id: user.id, 
        nome: user.nome,
        username: user.username,
        email: user.email,
        avatar: user.avatar,
        provider: 'github', 
        providerId
      },
      process.env.JWT_SECRET as string,
      {expiresIn: "7d"}
    );

    //redirecionamento caso tudo ocorra como esperado
    const frontendUrl = `http://localhost:3000/social-login?token=${token}`;
    res.redirect(frontendUrl);
    
  } catch (err) {
    console.error("Erro na autenticação GitHub:", err);
    return redirectWithToast(res, {
      title: "Erro no login com GitHub",
      description: "Houve um problema ao autenticar. Tente novamente."
    })
  }
});

export default router;