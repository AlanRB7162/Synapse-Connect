import { Router } from 'express';
import db from '../db';
import dotenv from 'dotenv';
import { redirectWithToast } from '../utils/redirectWithToast';
import { ResultSetHeader } from 'mysql2';

dotenv.config();

const router = Router();

router.post("/criar", async (req, res) => {
    const wantsJson = req.headers.accept?.includes('application/json');

    const { nome, descricao, nivel, preco, categorias, videos, autor, capa } = req.body;

    try{
        // 1. Buscar ID do nível
        const [nivelResult] = await db.promise().query<any[]>(
            `SELECT id FROM Nivel WHERE nome = ?`, [nivel]
        );

        if (!nivelResult.length) {
            return redirectWithToast(res, {
                title: "",
                description: "",
                json: wantsJson,
                to: "/meus-cursos"
            })
        }

        const nivelId = nivelResult[0].id;

        // 2. Converter preco "R$ 32,12" => 32.12
        const precoNumerico = parseFloat(
          preco
            .replace("R$", "")        // remove "R$"
            .replace(/\s/g, "")       // remove espaços
            .replace(/\./g, "")       // remove pontos (milhares)
            .replace(",", ".")        // troca vírgula por ponto decimal
          );

        if (isNaN(precoNumerico)) {
            return redirectWithToast(res, {
                title: "",
                description: "",
                json: wantsJson,
                to: "/meus-cursos"
            })
        }   

        // 3. Inserir curso
        const [cursoResult] = await db.promise().query<ResultSetHeader>(
            `INSERT INTO Cursos (nome, descricao, nivel_id, valor, autor, capa_url)
            VALUES (?, ?, ?, ?, ?, ?)`,
            [nome, descricao, nivelId, precoNumerico, autor, capa]
        );

        const cursoId = cursoResult.insertId;

        // 4. Inserir vídeos com ordem
        if (Array.isArray(videos)) {
            for (let i = 0; i < videos.length; i++) {
                const video = videos[i];

                if (video?.videoId) {
                    await db.promise().query(
                        `INSERT INTO VideoAula (curso, videoId, ordem) VALUES (?, ?, ?)`,
                        [cursoId, video.videoId, i] // ordem = índice do vídeo no array
                    );
                }
            }
        } else {
            return redirectWithToast(res, {
                title: "",
                description: "",
                json: wantsJson,
                to: "/meus-cursos"
            });
        }

        // 5. Inserir categorias: buscar IDs pelos nomes
        for (const nomeCategoria of categorias) {
            const [categoriaResult] = await db.promise().query<any[]>(
                "SELECT id FROM Categoria WHERE nome = ?",
                [nomeCategoria]
            );

            if (categoriaResult.length > 0) {
                const categoriaId = categoriaResult[0].id;

                await db.promise().query(
                    `INSERT INTO Curso_Categoria (curso, categoria) VALUES (?, ?)`,
                    [cursoId, categoriaId]
                );
            } else {
                return redirectWithToast(res, {
                title: "",
                description: "",
                json: wantsJson,
                to: "/meus-cursos"
            })
            }
        }

        res.status(201).json({ message: "Curso criado com sucesso", cursoId });

    } catch (err: any) {
        console.error('Erro ao cadastrar curso:', err);
        return redirectWithToast(res, {
            title: "Erro no servidor",
            description: "Ocorreu um problema ao criar o seu curso. Por favor, tente novamente mais tarde.",
            json: wantsJson,
        })
    }
})

router.get("/:id", async (req, res) => {
  const cursoId = req.params.id;

  try {
    const [cursoRows] = await db.promise().query<any[]>(
      `
      SELECT 
        c.id, c.nome, c.descricao, c.valor, c.capa_url, 
        u.nome AS autor_nome, u.avatar AS autor_avatar, u.username AS autor_username,
        n.nome AS nivel
      FROM Cursos c
      JOIN Usuario u ON c.autor = u.id
      JOIN Nivel n ON c.nivel_id = n.id
      WHERE c.id = ?
      `,
      [cursoId]
    );

    if (cursoRows.length === 0) {
      return res.status(404).json({ error: "Curso não encontrado." });
    }

    const curso = cursoRows[0];

    const [categoriasRows] = await db.promise().query<any[]>(
      `
      SELECT cat.nome
      FROM Curso_Categoria cc
      JOIN Categoria cat ON cc.categoria = cat.id
      WHERE cc.curso = ?
      `,
      [cursoId]
    );

    res.status(200).json({
      ...curso,
      categorias: categoriasRows.map(c => c.nome),
    });

  } catch (err) {
    console.error("Erro ao buscar curso:", err);
    res.status(500).json({ error: "Erro interno ao buscar o curso." });
  }
});

router.get("/categoria/:nome", async (req, res) => {
  const categoriaNome = req.params.nome;

  try {
    // 1. Buscar ids dos cursos que têm a categoria
    const [cursoIdsRows] = await db.promise().query<any[]>(`
      SELECT DISTINCT c.id 
      FROM Cursos c
      JOIN Curso_Categoria cc ON c.id = cc.curso
      JOIN Categoria cat ON cc.categoria = cat.id
      WHERE cat.nome = ?
    `, [categoriaNome]);

    const cursoIds = cursoIdsRows.map(row => row.id);

    if (cursoIds.length === 0) {
      return res.status(200).json([]);
    }

    // 2. Buscar dados dos cursos com todas as categorias
    const placeholders = cursoIds.map(() => '?').join(',');
    const [rows] = await db.promise().query<any[]>(`
      SELECT 
        c.id AS curso_id,
        c.nome AS curso_nome,
        c.descricao,
        c.valor,
        c.capa_url,
        u.nome AS autor_nome,
        u.username AS autor_username,
        u.avatar AS autor_avatar,
        n.nome AS nivel_nome,
        cat.nome AS categoria_nome
      FROM Cursos c
      JOIN Curso_Categoria cc ON c.id = cc.curso
      JOIN Categoria cat ON cc.categoria = cat.id
      JOIN Usuario u ON c.autor = u.id
      JOIN Nivel n ON c.nivel_id = n.id
      WHERE c.id IN (${placeholders})
      ORDER BY c.id DESC
    `, cursoIds); // <-- espalha o array no query params

    // 3. Agrupar cursos e categorias
    const cursosMap = new Map();

    for (const row of rows) {
      if (!cursosMap.has(row.curso_id)) {
        cursosMap.set(row.curso_id, {
          id: row.curso_id,
          nome: row.curso_nome,
          descricao: row.descricao,
          valor: row.valor,
          capa_url: row.capa_url,
          autor_nome: row.autor_nome,
          autor_username: row.autor_username,
          autor_avatar: row.autor_avatar,
          nivel: row.nivel_nome,
          categorias: [],
        });
      }

      const curso = cursosMap.get(row.curso_id);
      if (!curso.categorias.includes(row.categoria_nome)) {
        curso.categorias.push(row.categoria_nome);
      }
    }

    const cursos = Array.from(cursosMap.values());
    res.status(200).json(cursos);
  } catch (err) {
    console.error("Erro ao buscar cursos por categoria:", err);
    res.status(500).json({ error: "Erro ao buscar cursos." });
  }
});

router.get("/autor/:valor", async (req, res) => {
  const valor = req.params.valor;

  try {
    // 1. Descobrir se é id (número) ou username
    const isId = /^\d+$/.test(valor);

    // 2. Buscar o autor correspondente
    const [autorRows] = await db.promise().query<any[]>(`
      SELECT id, nome, username, avatar FROM Usuario WHERE ${isId ? 'id = ?' : 'username = ?'}
    `, [valor]);

    if (autorRows.length === 0) {
      return res.status(404).json({ error: "Autor não encontrado." });
    }

    const autor = autorRows[0];

    // 3. Buscar os cursos desse autor
    const [cursoIdsRows] = await db.promise().query<any[]>(`
      SELECT DISTINCT id FROM Cursos WHERE autor = ?
    `, [autor.id]);

    const cursoIds = cursoIdsRows.map(row => row.id);

    if (cursoIds.length === 0) {
      return res.status(200).json([]);
    }

    // 4. Buscar dados dos cursos com categorias
    const placeholders = cursoIds.map(() => '?').join(',');
    const [rows] = await db.promise().query<any[]>(`
      SELECT 
        c.id AS curso_id,
        c.nome AS curso_nome,
        c.descricao,
        c.valor,
        c.capa_url,
        n.nome AS nivel_nome,
        cat.nome AS categoria_nome
      FROM Cursos c
      JOIN Curso_Categoria cc ON c.id = cc.curso
      JOIN Categoria cat ON cc.categoria = cat.id
      JOIN Nivel n ON c.nivel_id = n.id
      WHERE c.id IN (${placeholders})
      ORDER BY c.id DESC
    `, cursoIds);

    // 5. Agrupar cursos e categorias
    const cursosMap = new Map();

    for (const row of rows) {
      if (!cursosMap.has(row.curso_id)) {
        cursosMap.set(row.curso_id, {
          id: row.curso_id,
          nome: row.curso_nome,
          descricao: row.descricao,
          valor: row.valor,
          capa_url: row.capa_url,
          autor_nome: autor.nome,
          autor_username: autor.username,
          autor_avatar: autor.avatar,
          nivel: row.nivel_nome,
          categorias: [],
        });
      }

      const curso = cursosMap.get(row.curso_id);
      if (!curso.categorias.includes(row.categoria_nome)) {
        curso.categorias.push(row.categoria_nome);
      }
    }

    const cursos = Array.from(cursosMap.values());
    res.status(200).json(cursos);
  } catch (err) {
    console.error("Erro ao buscar cursos do autor:", err);
    res.status(500).json({ error: "Erro interno no servidor." });
  }
});

router.delete("/:id/autor/:autorId", async (req, res) => {
  const cursoId = req.params.id;
  const autorId = req.params.autorId;

  try {
    // Verifica se o curso existe e pertence ao autor
    const [cursoRows] = await db.promise().query<any[]>(
      `SELECT id FROM Cursos WHERE id = ? AND autor = ?`,
      [cursoId, autorId]
    );

    if (cursoRows.length === 0) {
      return res.status(404).json({ error: "Curso não encontrado ou autor inválido." });
    }

    // Apaga o curso, o ON DELETE CASCADE cuidará dos registros relacionados
    await db.promise().query(`DELETE FROM Cursos WHERE id = ?`, [cursoId]);

    return res.status(200).json({ message: "Curso excluído com sucesso." });
  } catch (err) {
    console.error("Erro ao excluir curso:", err);
    return res.status(500).json({ error: "Erro interno ao excluir o curso." });
  }
});


export default router;