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
      title: "Falha na autenticação",
      description: "Não conseguimos identificar sua solicitação. Por favor, tente entrar novamente"
    });
  }

  try{
    const tokenRes = await axios.post(
      `https://github.com/login/oauth/access_token`,{
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
        title: "Problema ao conectar com o GitHub",
        description:"Não conseguimos receber a autorização para acessar sua conta. Tente novamente."
      })
    }

    const access_token = tokenRes.data.access_token;

    //pegar os dados do usuário
    const userRes = await axios.get("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    if (!userRes.data?.id || !userRes.data?.login){
      return redirectWithToast(res, {
        title: "Erro ao obter dados do GitHub",
        description: "Não conseguimos obter suas informações de perfil. Por favor, tente novamente."
      })
    }

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

    //verificando se usuário já está cadastrado no banco de dados
    const [rowsByProviderId] = await db.promise().query<any[]>(
      "SELECT * FROM Usuario WHERE provider_id = ? AND provider = 'github'",
      [providerId]
    );

    let user: any;

    if(rowsByProviderId.length > 0){
      // Usuário já existe pelo provider_id, usar ele
      user = rowsByProviderId[0];

      // Atualizar nome e avatar se diferente
      if(user.nome !== nome || user.avatar !== avatar){
        await db.promise().query(
          "UPDATE Usuario SET nome = ?, avatar = ? WHERE id = ?",
          [nome, avatar, user.id]
        );
        user.nome = nome;
        user.avatar = avatar;
      }
    } else{
      // Usuário não existe pelo provider_id, verificar se o email já está cadastrado para esse provider
      if(email){
        const [rowsByEmail] = await db.promise().query<any[]>(
          "SELECT * FROM Usuario WHERE email = ? AND provider = 'github'", [email]
        );

        if(rowsByEmail.length > 0){
          // Email já cadastrado para este provider, usar esse usuário (login)
          user = rowsByEmail[0];

          // Atualizar nome e avatar se diferente
          if(user.nome !== nome || user.avatar !== avatar){
            await db.promise().query(
              "UPDATE Usuario SET nome = ?, avatar = ? WHERE id = ?",
              [nome, avatar, user.id]
            );
            user.nome = nome;
            user.avatar = avatar;
          }
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
              title: "Erro no servidor",
              description: "Não conseguimos criar sua conta no momento. Por favor, tente novamente mais tarde."
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
            title: "Erro no servidor",
            description: "Não conseguimos criar sua conta no momento. Por favor, tente novamente mais tarde."
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
    const frontendUrl = `http://localhost:3000/entrar/github?token=${token}`;
    res.redirect(frontendUrl);
    
  } catch (err) {
    console.error("Erro na autenticação GitHub:", err);
    return redirectWithToast(res, {
      title: "Falha na autenticação",
      description: "Encontramos um problema ao processar seu login. Por favor, tente novamente."
    })
  }
});

router.get("/google/callback", async (req, res) => {
  const access_token = req.query.access_token as string;

  if (!access_token) {
    return redirectWithToast(res, {
      title: "Falha na autenticação",
      description: "Não conseguimos confirmar seu login. Por favor, tente novamente."
    });
  }

  try{
    const userRes = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    if (!userRes.data?.sub || !userRes.data?.email){
      return redirectWithToast(res, {
        title: "Erro ao obter dados do Google",
        description: "Não conseguimos obter suas informações de perfil. Por favor, tente novamente."
      })
    }

    const{
      sub: googleId,
      name, 
      email,
      picture
    } = userRes.data;

    //preparar os dados antes de usá-los
    const nome = (name || "").trim();
    let usernameBase = email?.split('@')[0];
    const username = await generateUniqueUsername(usernameBase, '_gl')
    const avatar = picture?.toString();
    const providerId = googleId?.toString();

    const [rowsByProviderId] = await db.promise().query<any[]>(
      "SELECT * FROM Usuario WHERE provider_id = ? AND provider = 'google'",
      [providerId]
    );

    let user: any;

    if(rowsByProviderId.length > 0){
      // Usuário já existe pelo provider_id, usar ele
      user = rowsByProviderId[0];

      // Atualizar nome e avatar se diferente
      if(user.nome !== nome || user.avatar !== avatar){
        await db.promise().query(
          "UPDATE Usuario SET nome = ?, avatar = ? WHERE id = ?",
          [nome, avatar, user.id]
        );
        // atualizar no objeto user também para refletir
        user.nome = nome;
        user.avatar = avatar;
      }
    } else {
      // Usuário não existe pelo provider_id, verificar se o email já está cadastrado para esse provider
      if(email){
        const [rowsByEmail] = await db.promise().query<any[]>(
          "SELECT * FROM Usuario WHERE email = ? AND provider = 'google'", [email]
        );

        if(rowsByEmail.length > 0){
          // Email já cadastrado para este provider, usar esse usuário (login)
          user = rowsByEmail[0];

          // Atualizar nome e avatar se diferente
          if(user.nome !== nome || user.avatar !== avatar){
            await db.promise().query(
              "UPDATE Usuario SET nome = ?, avatar = ? WHERE id = ?",
              [nome, avatar, user.id]
            );
            user.nome = nome;
            user.avatar = avatar;
          }
        } else {
          // Email não cadastrado, inserir novo usuário
          try{
            const [result] = await db.promise().query<ResultSetHeader>(
              "INSERT INTO Usuario (nome, email, username, avatar, provider, provider_id) VALUES (?, ?, ?, ?, 'google', ?)",
              [nome, email, username, avatar, providerId]
            );
            user = {
              id: result.insertId,
              nome, username, email, avatar
            }
          } catch (err) {
            console.error("Erro ao cadastrar novo usuário:", err);
            return redirectWithToast(res, {
              title: "Erro no servidor",
              description: "Não conseguimos criar sua conta no momento. Por favor, tente novamente mais tarde."
            });
          }
        }
      } else {
        // Email não disponível (null), inserir usuário novo baseado no provider_id
        try{
          const [result] = await db.promise().query<ResultSetHeader>(
            "INSERT INTO Usuario (nome, email, username, avatar, provider, provider_id) VALUES (?, ?, ?, ?, 'google', ?)",
            [nome, email, username, avatar, providerId]
          );
          user = {
            id: result.insertId,
            nome, username, email, avatar
          }
        } catch (err) {
          console.error("Erro ao cadastrar novo usuário:", err);
          return redirectWithToast(res, {
            title: "Erro no servidor",
            description: "Não conseguimos criar sua conta no momento. Por favor, tente novamente mais tarde."
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
        provider: 'google', 
        providerId
      },
      process.env.JWT_SECRET as string,
      {expiresIn: "7d"}
    );
    
    //redirecionamento caso tudo ocorra como esperado
    const frontendUrl = `http://localhost:3000/entrar/google?token=${token}`;
    res.redirect(frontendUrl);

  } catch (err) {
    console.error("Erro ao obter dados do Google:", err);
    return redirectWithToast(res, {
      title: "Erro na autenticação Google",
      description: "Não conseguimos acessar seus dados. Por favor, tente novamente."
    });
  }
})

export default router;