import { Router } from "express";
import db from '../db';

const connection = require('../db');
const router = Router();

router.get('/:cursoId', (req, res) => {
  const { cursoId } = req.params;

  const query = 'SELECT url_curso FROM cursos WHERE id = ?';
  connection.query(query, [cursoId], (err, results) => {
    if (err) return res.status(500).json({ error: 'Erro no banco de dados' });
    if (results.length === 0) return res.status(404).json({ error: 'Curso não encontrado' });

    res.json({ url: results[0].url_curso});
  });
});

router.post('/', (req, res) => {
  const { cursoId, videoUrl } = req.body;

  if (!cursoId || !videoUrl) {
    return res.status(400).json({ error: 'cursoId e videoUrl são obrigatórios' });
  }

  const query = 'UPDATE cursos SET url_curso = ? WHERE id = ?';
  connection.query(query, [url_curso, cursoId], (err, result) => {
    if (err) return res.status(500).json({ error: 'Erro ao salvar URL no banco' });
    res.status(200).json({ message: 'URL salva com sucesso!' });
  });
});

module.exports = router;