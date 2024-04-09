import { Livro } from '@prisma/client';

export class LivroEntity implements Livro {
  createdAt: Date;
  updatedAt: Date;
  id: number;
  titulo: string;
  autor: string;
  editora: string;
  ano: number;
  paginas: number;
  genero: string;
  sinopse: string;
  emprestado: boolean;
  idUsuario: number;
}
