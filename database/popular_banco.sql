-- Seleciona o banco de dados correto
USE db_synapse;

-- Inserção de usuários de exemplo

INSERT INTO Usuario (id, nome, username, email, senha, provider)
VALUES 
  (1, 'Patrick Santos', 'patrick', 'patrick@email.com', '', 'local'),
  (2, 'Gabriel Lopes', 'gabriel', 'gabriel@email.com', '', 'local'),
  (3, 'Alan Binato', 'alan', 'alan@email.com', '', 'local'),
  (4, 'Lucas Claris', 'lucas', 'lucas@email.com', '', 'local');

-- Inserção de cursos de exemplo

-- Curso 1
INSERT INTO Cursos (id, nome, descricao, autor, valor, nivel_id, capa_url)
VALUES (1, 'Projetos com Flutter', 'Construa projetos reais usando Flutter de forma simples e eficiente.', 1, 74.73, 4, 'https://img.youtube.com/vi/3rlr1nP3F3k/maxresdefault.jpg');

INSERT INTO Curso_Categoria (curso, categoria)
VALUES (1, 12);

INSERT INTO Curso_Categoria (curso, categoria)
VALUES (1, 10);

INSERT INTO Curso_Categoria (curso, categoria)
VALUES (1, 14);

INSERT INTO VideoAula (curso, videoId, ordem)
VALUES (1, '3rlr1nP3F3k', 1);

INSERT INTO VideoAula (curso, videoId, ordem)
VALUES (1, 'RRubcjpTkks', 2);

INSERT INTO VideoAula (curso, videoId, ordem)
VALUES (1, 'Qqx_wzMmFeA', 3);

-- Curso 2
INSERT INTO Cursos (id, nome, descricao, autor, valor, nivel_id, capa_url)
VALUES (2, 'Projetos com PostgreSQL', 'Explore conceitos avançados de PostgreSQL de forma simples e eficiente.', 3, 9.51, 2, 'https://img.youtube.com/vi/_uQrJ0TkZlc/maxresdefault.jpg');

INSERT INTO Curso_Categoria (curso, categoria)
VALUES (2, 7);

INSERT INTO VideoAula (curso, videoId, ordem)
VALUES (2, '_uQrJ0TkZlc', 1);

INSERT INTO VideoAula (curso, videoId, ordem)
VALUES (2, 'Qqx_wzMmFeA', 2);

-- Curso 3
INSERT INTO Cursos (id, nome, descricao, autor, valor, nivel_id, capa_url)
VALUES (3, 'Dominando iOS', 'Guia completo para se destacar em iOS de forma simples e eficiente.', 1, 13.92, 4, 'https://img.youtube.com/vi/Z1RJmh_OqeA/maxresdefault.jpg');

INSERT INTO Curso_Categoria (curso, categoria)
VALUES (3, 13);

INSERT INTO VideoAula (curso, videoId, ordem)
VALUES (3, 'Z1RJmh_OqeA', 1);

INSERT INTO VideoAula (curso, videoId, ordem)
VALUES (3, 'SjKJcS3JoiQ', 2);

INSERT INTO VideoAula (curso, videoId, ordem)
VALUES (3, 'RRubcjpTkks', 3);

-- Curso 4
INSERT INTO Cursos (id, nome, descricao, autor, valor, nivel_id, capa_url)
VALUES (4, 'Dominando React Native', 'Aprenda os fundamentos essenciais de React Native de forma simples e eficiente.', 3, 89.77, 1, 'https://img.youtube.com/vi/lY6icfhap2o/maxresdefault.jpg');

INSERT INTO Curso_Categoria (curso, categoria)
VALUES (4, 5);

INSERT INTO Curso_Categoria (curso, categoria)
VALUES (4, 2);

INSERT INTO Curso_Categoria (curso, categoria)
VALUES (4, 4);

INSERT INTO VideoAula (curso, videoId, ordem)
VALUES (4, 'lY6icfhap2o', 1);

-- Curso 5
INSERT INTO Cursos (id, nome, descricao, autor, valor, nivel_id, capa_url)
VALUES (5, 'Dominando PHP', 'Curso ideal para quem quer aprender PHP de forma simples e eficiente.', 4, 171.07, 2, 'https://img.youtube.com/vi/Qqx_wzMmFeA/maxresdefault.jpg');

INSERT INTO Curso_Categoria (curso, categoria)
VALUES (5, 14);

INSERT INTO Curso_Categoria (curso, categoria)
VALUES (5, 11);

INSERT INTO Curso_Categoria (curso, categoria)
VALUES (5, 2);

INSERT INTO VideoAula (curso, videoId, ordem)
VALUES (5, 'Qqx_wzMmFeA', 1);

INSERT INTO VideoAula (curso, videoId, ordem)
VALUES (5, 'lY6icfhap2o', 2);

INSERT INTO VideoAula (curso, videoId, ordem)
VALUES (5, 'BXqUH86F-kA', 3);

-- Curso 6
INSERT INTO Cursos (id, nome, descricao, autor, valor, nivel_id, capa_url)
VALUES (6, 'Dominando CSS', 'Guia completo para se destacar em CSS de forma simples e eficiente.', 3, 114.17, 2, 'https://img.youtube.com/vi/lY6icfhap2o/maxresdefault.jpg');

INSERT INTO Curso_Categoria (curso, categoria)
VALUES (6, 14);

INSERT INTO Curso_Categoria (curso, categoria)
VALUES (6, 8);

INSERT INTO Curso_Categoria (curso, categoria)
VALUES (6, 12);

INSERT INTO VideoAula (curso, videoId, ordem)
VALUES (6, 'lY6icfhap2o', 1);

INSERT INTO VideoAula (curso, videoId, ordem)
VALUES (6, 'BXqUH86F-kA', 2);

-- Curso 7
INSERT INTO Cursos (id, nome, descricao, autor, valor, nivel_id, capa_url)
VALUES (7, 'Dominando Android', 'Domine habilidades práticas com Android de forma simples e eficiente.', 4, 29.48, 5, 'https://img.youtube.com/vi/SjKJcS3JoiQ/maxresdefault.jpg');

INSERT INTO Curso_Categoria (curso, categoria)
VALUES (7, 8);

INSERT INTO Curso_Categoria (curso, categoria)
VALUES (7, 7);

INSERT INTO Curso_Categoria (curso, categoria)
VALUES (7, 10);

INSERT INTO VideoAula (curso, videoId, ordem)
VALUES (7, 'SjKJcS3JoiQ', 1);

-- Curso 8
INSERT INTO Cursos (id, nome, descricao, autor, valor, nivel_id, capa_url)
VALUES (8, 'Masterclass de React', 'Curso ideal para quem quer aprender React de forma simples e eficiente.', 2, 192.83, 3, 'https://img.youtube.com/vi/PkZNo7MFNFg/maxresdefault.jpg');

INSERT INTO Curso_Categoria (curso, categoria)
VALUES (8, 11);

INSERT INTO Curso_Categoria (curso, categoria)
VALUES (8, 15);

INSERT INTO VideoAula (curso, videoId, ordem)
VALUES (8, 'PkZNo7MFNFg', 1);

INSERT INTO VideoAula (curso, videoId, ordem)
VALUES (8, 'lY6icfhap2o', 2);

-- Curso 9
INSERT INTO Cursos (id, nome, descricao, autor, valor, nivel_id, capa_url)
VALUES (9, 'Guia prático de Android', 'Aprenda os fundamentos essenciais de Android de forma simples e eficiente.', 3, 52.39, 3, 'https://img.youtube.com/vi/Qqx_wzMmFeA/maxresdefault.jpg');

INSERT INTO Curso_Categoria (curso, categoria)
VALUES (9, 1);

INSERT INTO VideoAula (curso, videoId, ordem)
VALUES (9, 'Qqx_wzMmFeA', 1);

INSERT INTO VideoAula (curso, videoId, ordem)
VALUES (9, '8GPPJpiLqHk', 2);

-- Curso 10
INSERT INTO Cursos (id, nome, descricao, autor, valor, nivel_id, capa_url)
VALUES (10, 'Primeiros passos com Android', 'Construa projetos reais usando Android de forma simples e eficiente.', 3, 8.57, 1, 'https://img.youtube.com/vi/7S_tz1z_5bA/maxresdefault.jpg');

INSERT INTO Curso_Categoria (curso, categoria)
VALUES (10, 7);

INSERT INTO Curso_Categoria (curso, categoria)
VALUES (10, 5);

INSERT INTO Curso_Categoria (curso, categoria)
VALUES (10, 8);

INSERT INTO VideoAula (curso, videoId, ordem)
VALUES (10, '7S_tz1z_5bA', 1);

INSERT INTO VideoAula (curso, videoId, ordem)
VALUES (10, 'PkZNo7MFNFg', 2);

-- Curso 11
INSERT INTO Cursos (id, nome, descricao, autor, valor, nivel_id, capa_url)
VALUES (11, 'Dominando Python', 'Aprenda os fundamentos essenciais de Python de forma simples e eficiente.', 2, 19.56, 3, 'https://img.youtube.com/vi/8GPPJpiLqHk/maxresdefault.jpg');

INSERT INTO Curso_Categoria (curso, categoria)
VALUES (11, 16);

INSERT INTO VideoAula (curso, videoId, ordem)
VALUES (11, '8GPPJpiLqHk', 1);

INSERT INTO VideoAula (curso, videoId, ordem)
VALUES (11, '7S_tz1z_5bA', 2);

-- Curso 12
INSERT INTO Cursos (id, nome, descricao, autor, valor, nivel_id, capa_url)
VALUES (12, 'Guia prático de JavaScript', 'Construa projetos reais usando JavaScript de forma simples e eficiente.', 4, 52.01, 4, 'https://img.youtube.com/vi/7S_tz1z_5bA/maxresdefault.jpg');

INSERT INTO Curso_Categoria (curso, categoria)
VALUES (12, 14);

INSERT INTO Curso_Categoria (curso, categoria)
VALUES (12, 6);

INSERT INTO Curso_Categoria (curso, categoria)
VALUES (12, 2);

INSERT INTO VideoAula (curso, videoId, ordem)
VALUES (12, '7S_tz1z_5bA', 1);

INSERT INTO VideoAula (curso, videoId, ordem)
VALUES (12, 'lY6icfhap2o', 2);

-- Curso 13
INSERT INTO Cursos (id, nome, descricao, autor, valor, nivel_id, capa_url)
VALUES (13, 'Começando com CSS', 'Guia completo para se destacar em CSS de forma simples e eficiente.', 1, 32.33, 5, 'https://img.youtube.com/vi/Z1RJmh_OqeA/maxresdefault.jpg');

INSERT INTO Curso_Categoria (curso, categoria)
VALUES (13, 8);

INSERT INTO Curso_Categoria (curso, categoria)
VALUES (13, 3);

INSERT INTO Curso_Categoria (curso, categoria)
VALUES (13, 13);

INSERT INTO VideoAula (curso, videoId, ordem)
VALUES (13, 'Z1RJmh_OqeA', 1);

INSERT INTO VideoAula (curso, videoId, ordem)
VALUES (13, 'wgKJMzqCgm4', 2);

-- Curso 14
INSERT INTO Cursos (id, nome, descricao, autor, valor, nivel_id, capa_url)
VALUES (14, 'Guia prático de PHP', 'Construa projetos reais usando PHP de forma simples e eficiente.', 3, 108.55, 4, 'https://img.youtube.com/vi/BXqUH86F-kA/maxresdefault.jpg');

INSERT INTO Curso_Categoria (curso, categoria)
VALUES (14, 1);

INSERT INTO VideoAula (curso, videoId, ordem)
VALUES (14, 'BXqUH86F-kA', 1);

INSERT INTO VideoAula (curso, videoId, ordem)
VALUES (14, 'Z1RJmh_OqeA', 2);

INSERT INTO VideoAula (curso, videoId, ordem)
VALUES (14, 'PkZNo7MFNFg', 3);

-- Curso 15
INSERT INTO Cursos (id, nome, descricao, autor, valor, nivel_id, capa_url)
VALUES (15, 'Introdução ao Python', 'Curso ideal para quem quer aprender Python de forma simples e eficiente.', 2, 2.19, 5, 'https://img.youtube.com/vi/wgKJMzqCgm4/maxresdefault.jpg');

INSERT INTO Curso_Categoria (curso, categoria)
VALUES (15, 1);

INSERT INTO VideoAula (curso, videoId, ordem)
VALUES (15, 'wgKJMzqCgm4', 1);

-- Curso 16
INSERT INTO Cursos (id, nome, descricao, autor, valor, nivel_id, capa_url)
VALUES (16, 'Primeiros passos com JavaScript', 'Aprenda os fundamentos essenciais de JavaScript de forma simples e eficiente.', 2, 178.36, 5, 'https://img.youtube.com/vi/Qqx_wzMmFeA/maxresdefault.jpg');

INSERT INTO Curso_Categoria (curso, categoria)
VALUES (16, 11);

INSERT INTO VideoAula (curso, videoId, ordem)
VALUES (16, 'Qqx_wzMmFeA', 1);

-- Curso 17
INSERT INTO Cursos (id, nome, descricao, autor, valor, nivel_id, capa_url)
VALUES (17, 'Introdução ao MongoDB', 'Aprenda os fundamentos essenciais de MongoDB de forma simples e eficiente.', 4, 76.99, 3, 'https://img.youtube.com/vi/RRubcjpTkks/maxresdefault.jpg');

INSERT INTO Curso_Categoria (curso, categoria)
VALUES (17, 7);

INSERT INTO Curso_Categoria (curso, categoria)
VALUES (17, 1);

INSERT INTO VideoAula (curso, videoId, ordem)
VALUES (17, 'RRubcjpTkks', 1);

INSERT INTO VideoAula (curso, videoId, ordem)
VALUES (17, 'BXqUH86F-kA', 2);

INSERT INTO VideoAula (curso, videoId, ordem)
VALUES (17, '8GPPJpiLqHk', 3);

-- Curso 18
INSERT INTO Cursos (id, nome, descricao, autor, valor, nivel_id, capa_url)
VALUES (18, 'Primeiros passos com MySQL', 'Curso ideal para quem quer aprender MySQL de forma simples e eficiente.', 1, 125.99, 5, 'https://img.youtube.com/vi/epDCjksKMok/maxresdefault.jpg');

INSERT INTO Curso_Categoria (curso, categoria)
VALUES (18, 8);

INSERT INTO VideoAula (curso, videoId, ordem)
VALUES (18, 'epDCjksKMok', 1);

INSERT INTO VideoAula (curso, videoId, ordem)
VALUES (18, '7S_tz1z_5bA', 2);

-- Curso 19
INSERT INTO Cursos (id, nome, descricao, autor, valor, nivel_id, capa_url)
VALUES (19, 'Começando com Node.js', 'Domine habilidades práticas com Node.js de forma simples e eficiente.', 2, 86.77, 5, 'https://img.youtube.com/vi/8GPPJpiLqHk/maxresdefault.jpg');

INSERT INTO Curso_Categoria (curso, categoria)
VALUES (19, 8);

INSERT INTO Curso_Categoria (curso, categoria)
VALUES (19, 6);

INSERT INTO VideoAula (curso, videoId, ordem)
VALUES (19, '8GPPJpiLqHk', 1);

INSERT INTO VideoAula (curso, videoId, ordem)
VALUES (19, 'epDCjksKMok', 2);

INSERT INTO VideoAula (curso, videoId, ordem)
VALUES (19, 'Z1RJmh_OqeA', 3);