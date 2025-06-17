import { Router } from 'express';
import db from '../db';
import dotenv from 'dotenv';

dotenv.config();

const router = Router();

// Supondo que seu arquivo router já existe e está configurado
router.get("/:cursoId", async (req, res) => {
  const { cursoId } = req.params;

  try {
    // Busca vídeos do curso ordenados pela coluna 'ordem'
    const [videos] = await db.promise().query<any[]>(
      "SELECT videoId, ordem FROM VideoAula WHERE curso = ? ORDER BY ordem ASC",
      [cursoId]
    );

    if (!videos.length) {
      return res.status(404).json({ message: "Nenhum vídeo encontrado para este curso." });
    }

    return res.status(200).json({ videos });
  } catch (error) {
    console.error("Erro ao buscar vídeos do curso:", error);
    return res.status(500).json({ message: "Erro no servidor ao buscar vídeos." });
  }
});

export default router;