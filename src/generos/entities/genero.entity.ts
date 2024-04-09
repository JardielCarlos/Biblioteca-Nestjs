import { Genero } from '@prisma/client';

export class GeneroEntity implements Genero {
  id: number;
  nome: string;
}
