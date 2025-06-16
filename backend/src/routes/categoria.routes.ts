import { Router, Request, Response } from "express";
import db from "../db";

const router = Router();

// GET /categoria - lista todas as categorias
router.get("/", (req: Request, res: Response) => {
  db.query("SELECT id, nome FROM Categoria ORDER BY nome", (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Erro ao buscar categorias" });
    }
    res.json(results);
  });
});

// POST /categoria - cria nova categoria
router.post("/", (req: Request, res: Response) => {
  const { nome } = req.body;
  if (!nome) return res.status(400).json({ error: "Nome da categoria é obrigatório" });

  db.query("INSERT INTO Categoria (nome) VALUES (?)", [nome], (err, result: any) => {
    if (err) {
      console.error(err);
      if (err.code === "ER_DUP_ENTRY") {
        return res.status(409).json({ error: "Categoria já existe" });
      }
      return res.status(500).json({ error: "Erro ao criar categoria" });
    }
    res.status(201).json({ id: result.insertId, nome });
  });
});

export default router;