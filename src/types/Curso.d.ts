export type Curso = {
  id: string;
  nome: string;
  descricao: string;
  imagemUrl: string;
  preco: number;
  autor: {
    nome: string;
    avatar?: string | null;
  };
  nivel?: string;
  categorias?: string[];
};
