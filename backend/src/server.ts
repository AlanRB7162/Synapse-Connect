import express from 'express';
import cors from 'cors';
import db from './db';

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