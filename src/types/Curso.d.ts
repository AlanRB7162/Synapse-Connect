export type Curso = {
  id: string;
  nome: string;
  descricao: string;
  imagemUrl: string;
  preco: number;
  autor: {
    id: string;
    nome: string;
  };
};