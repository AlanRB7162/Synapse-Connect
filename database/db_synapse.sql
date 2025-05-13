create database db_synapse;
 use db_synapse;
CREATE TABLE Usuario (
    idUsuario INT PRIMARY KEY,
    email VARCHAR(45),
    nome VARCHAR(45),
    senha VARCHAR(45),
    isProf TINYINT,
    usuario VARCHAR(45),
    histCompra VARCHAR(45)
);

CREATE TABLE Cursos (
    idCursos INT PRIMARY KEY,
    nomeCurso VARCHAR(45),
    descrip VARCHAR(45),
    Usuario_idUsuario INT,
    valor VARCHAR(45),
    FOREIGN KEY (Usuario_idUsuario) REFERENCES Usuario(idUsuario)
);

CREATE TABLE Pedido (
    idCarrinho INT PRIMARY KEY,
    Usuario_idUsuario INT,
    FOREIGN KEY (Usuario_idUsuario) REFERENCES Usuario(idUsuario)
);

CREATE TABLE Pedido_has_Cursos (
    Pedido_idCarrinho INT,
    Pedido_Usuario_idUsuario INT,
    Cursos_idCursos INT,
    FOREIGN KEY (Pedido_idCarrinho) REFERENCES Pedido(idCarrinho),
    FOREIGN KEY (Pedido_Usuario_idUsuario) REFERENCES Usuario(idUsuario),
    FOREIGN KEY (Cursos_idCursos) REFERENCES Cursos(idCursos)
);