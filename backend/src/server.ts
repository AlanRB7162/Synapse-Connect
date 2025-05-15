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