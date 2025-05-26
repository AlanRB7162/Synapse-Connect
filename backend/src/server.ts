import express from 'express';
import cors from 'cors';
import db from './db';
import axios from "axios";

const app = express();
app.use(cors());
app.use(express.json());

//Connection verification test
app.get("/ping", (req, res) => {
  db.query("SELECT 1", (err) => {
    if (err) res.status(500).json({ error: "Erro ao conectar ao MySQL" });
    else res.json({ message: "Conexão bem-sucedida!" });
  });
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

app.post("/register", (req, res) => {
  const { nome, usuario, email, senha } = req.body;

  db.query(
    "INSERT INTO Usuario (nome, usuario, email, senha) VALUES (?, ?, ?, ?)",
    [nome, usuario, email, senha],
    (err, result) => {
      if (err) {
        console.error ("Registering error: ", err);
        return res.status(500).json({ error: "Database registration error" });
      }

      console.log("User registered successfully: ", { nome, usuario, email });
      res.status(200).json({ message: "Registration successful"});
    }
  );
});

app.post("/login", (req, res) => {
  const { loginInput, senha } = req.body;

  db.query(
    "SELECT * FROM Usuario WHERE (email = ? OR usuario = ?) AND senha = ?",
    [loginInput, loginInput, senha],
    (err, result: any) => {
      if (err) {
        console.error("Login validation error: ", err);
        return res.status(500).json({ error: "Internal server error on login validation"});
      }
      if (result.length > 0) {
        console.log("Login successful: ", result[0]);
        res.status(200).json({ message: "Login successful", user: result[0] });
      } else {
        console.log("Invalid login credentials");
        res.status(401).json({ error: "Invalid login credentials" });
      }
    }
  );
});


//github Login features
const CLIENT_ID_GITHUB = "Ov23liWwkyOZLTDR9qs2";
const CLIENT_SECRET_GITHUB = "680385149e68946ffc9b37b8c2903ec43ab6441c";

app.get("/auth/github/callback", async (req, res) => {
  const code = req.query.code;

  try {
    // Trocar o code por access token
    const tokenRes = await axios.post(
      `https://github.com/login/oauth/access_token`,
      {
        client_id: CLIENT_ID_GITHUB,
        client_secret: CLIENT_SECRET_GITHUB,
        code,
      },
      {
        headers: {
          accept: "application/json",
        },
      }
    );

    const access_token = tokenRes.data.access_token;

    // Buscar dados do usuário com o token
    const userRes = await axios.get("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    // Exemplo: redireciona para frontend com nome no query
    res.redirect(`http://localhost:3000/?name=${userRes.data.name}`);
  } catch (err) {
    res.status(500).json({ error: "Erro na autenticação com GitHub" });
  }
});

app.listen(3001, () => {
  console.log("Servidor backend ouvindo na porta 3001");
});