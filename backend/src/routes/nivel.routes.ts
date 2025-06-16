import { Router, Request, Response } from "express";
import db from "../db";

const router = Router();

// GET /nivel - lista todos os níveis
router.get("/", (req: Request, res: Response) => {
  db.query("SELECT id, nome FROM Nivel ORDER BY id", (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Erro ao buscar níveis" });
    }
    res.json(results);
  });
});

// POST /nivel - cria novo nível
router.post("/", (req: Request, res: Response) => {
  const { nome } = req.body;
  if (!nome) return res.status(400).json({ error: "Nome do nível é obrigatório" });

  db.query("INSERT INTO Nivel (nome) VALUES (?)", [nome], (err, result: any) => {
    if (err) {
      console.error(err);
      if (err.code === "ER_DUP_ENTRY") {
        return res.status(409).json({ error: "Nível já existe" });
      }
      return res.status(500).json({ error: "Erro ao criar nível" });
    }
    res.status(201).json({ id: result.insertId, nome });
  });
});

export default router;
