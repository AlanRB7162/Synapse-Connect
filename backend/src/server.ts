// backend/src/server.ts

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import db from './db';
import userRoutes from './routes/user.routes'
import authRoutes from './routes/auth.routes'
import chalk from 'chalk';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/user", userRoutes);
app.use("/auth", authRoutes);

// Teste de conexão com o banco
app.get("/ping", (req, res) => {
  db.query("SELECT 1", (err: any) => {
    if (err) return res.status(500).json({ error: "Erro ao conectar ao MySQL" });
    res.json({ message: "Conexão bem-sucedida!" });
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(chalk.green(`Servidor rodando na porta ${PORT}`));
});