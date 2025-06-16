-- //database/db_synapse.sql

create database db_synapse;

use db_synapse;

-- 🧑‍💻 Usuários
CREATE TABLE Usuario (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nome VARCHAR(100) NOT NULL,
  username VARCHAR(50) NOT NULL UNIQUE,
  email VARCHAR(100) NOT NULL,
  senha VARCHAR(255),
  provider ENUM('local', 'google', 'github') NOT NULL,
  provider_id VARCHAR(255),
  avatar TEXT,
  criado_em DATETIME DEFAULT CURRENT_TIMESTAMP,

  -- 🔒 Garantir que provider_id seja único dentro do seu provider
  UNIQUE KEY unique_provider (provider, provider_id),

  -- 🔒 Garantir que o mesmo email não se repita para o mesmo provider
  UNIQUE KEY unique_email_provider (provider, email)
);

-- 🏷️ Categorias
CREATE TABLE Categoria (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nome VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE Nivel (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nome VARCHAR(50) NOT NULL UNIQUE
);

-- 📚 Cursos
CREATE TABLE Cursos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100),
    descricao VARCHAR(400),
    autor INT,
    valor DECIMAL(7,2) NOT NULL,
    nivel_id INT,
    capa_url TEXT DEFAULT NULL,
    FOREIGN KEY (autor) REFERENCES Usuario(id) ON DELETE CASCADE,
    FOREIGN KEY (nivel_id) REFERENCES Nivel(id) ON DELETE SET NULL
);

CREATE TABLE VideoAula (
  id INT PRIMARY KEY AUTO_INCREMENT,
  curso INT,
  videoId VARCHAR(255) NOT NULL,
  ordem INT,
  FOREIGN KEY (curso) REFERENCES Cursos(id) ON DELETE CASCADE
);

-- 🔗 Relação entre curso e categoria
CREATE TABLE Curso_Categoria (
  curso INT,
  categoria INT,
  PRIMARY KEY (curso, categoria),
  FOREIGN KEY (curso) REFERENCES Cursos(id) ON DELETE CASCADE,
  FOREIGN KEY (categoria) REFERENCES Categoria(id) ON DELETE CASCADE
);

-- 🧾 Pedidos
CREATE TABLE Pedido (
    id INT PRIMARY KEY AUTO_INCREMENT,
    usuario INT,
    FOREIGN KEY (usuario) REFERENCES Usuario(id) ON DELETE CASCADE
);

-- 🛒 Cursos por pedido
CREATE TABLE Pedido_has_Cursos (
    pedido INT,
    curso INT,
    PRIMARY KEY (pedido, curso),
    FOREIGN KEY (pedido) REFERENCES Pedido(id) ON DELETE CASCADE,
    FOREIGN KEY (curso) REFERENCES Cursos(id) ON DELETE CASCADE
);

INSERT INTO Categoria (nome) VALUES
('Lógica de Programação'),
('HTML'),
('CSS'),
('JS'),
('React'),
('Node.js'),
('PHP'),
('Java'),
('Python'),
('Flutter'),
('React Native'),
('Android'),
('iOS'),
('MySQL'),
('MongoDB'),
('PostgreSQL');

INSERT INTO Nivel (nome) VALUES
('Iniciante'),
('Básico'),
('Intermediário'),
('Avançado'),
('Especialista');

-- Consultas para teste (opcional)
SELECT * FROM Usuario;
SELECT * FROM Cursos;
SELECT * FROM Categoria;
SELECT * FROM Nivel;
SELECT * FROM Curso_Categoria;
SELECT * FROM Pedido;
SELECT * FROM Pedido_has_Cursos;