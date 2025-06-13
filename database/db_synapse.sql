--//database/db_synapse.sql

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

-- 📚 Cursos
CREATE TABLE Cursos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100),
    descricao VARCHAR(255),
    autor INT,
    valor DECIMAL(10,2),    
    FOREIGN KEY (autor) REFERENCES Usuario(id)
);

-- 🏷️ Categorias
CREATE TABLE Categoria (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nome VARCHAR(100) NOT NULL UNIQUE
);

-- 🔗 Relação entre curso e categoria
CREATE TABLE Curso_Categoria (
  curso INT,
  categoria INT,
  PRIMARY KEY (curso, categoria),
  FOREIGN KEY (curso) REFERENCES Cursos(id),
  FOREIGN KEY (categoria) REFERENCES Categoria(id)
);

-- 🧾 Pedidos
CREATE TABLE Pedido (
    id INT PRIMARY KEY AUTO_INCREMENT,
    usuario INT,
    FOREIGN KEY (usuario) REFERENCES Usuario(id)
);

-- 🛒 Cursos por pedido
CREATE TABLE Pedido_has_Cursos (
    pedido INT,
    curso INT,
    PRIMARY KEY (pedido, curso),
    FOREIGN KEY (pedido) REFERENCES Pedido(id),
    FOREIGN KEY (curso) REFERENCES Cursos(id)
);

SELECT * FROM Usuario;
SELECT * FROM Cursos;
SELECT * FROM Categoria;
SELECT * FROM Curso_Categoria;
SELECT * FROM Pedido;
SELECT * FROM Pedido_has_Cursos;