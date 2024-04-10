import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateLivroDto } from './dto/create-livro.dto';
import { UpdateLivroDto } from './dto/update-livro.dto';

@Injectable()
export class LivrosService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createLivroDto: CreateLivroDto) {
    const generos = await Promise.all(
      createLivroDto.generos.map((genero) => this.preloadGeneroByName(genero)),
    );

    return this.prismaService.livro.create({
      data: {
        ...createLivroDto,
        generos: {
          create: generos.map((genero) => ({
            generoId: genero.id,
          })),
        },
      },
      include: {
        generos: {
          select: {
            genero: true,
          },
        },
      },
    });
  }

  findAll() {
    return this.prismaService.livro.findMany({
      include: {
        generos: {
          select: {
            genero: true,
          },
        },
      },
    });
  }

  findOne(id: number) {
    return this.prismaService.livro.findFirst({
      where: { id },
    });
  }

  async update(id: number, updateLivroDto: UpdateLivroDto) {
    const livro = await this.prismaService.livro.findUnique({
      where: { id },
      include: {
        generos: {
          select: {
            genero: true,
          },
        },
      },
    });

    if (!livro) {
      throw new NotFoundException(`Livro #${id} não encontrado`);
    }

    let generosParaAdicionar = [];

    if (updateLivroDto.generos) {
      const generos = await Promise.all(
        updateLivroDto.generos.map((genero) =>
          this.preloadGeneroByName(genero),
        ),
      );

      const generosNaoPresentes = generos.filter(
        (gen) =>
          !livro.generos.some((livroGen) => livroGen.genero.nome === gen.nome),
      );

      generosParaAdicionar = generosNaoPresentes.map((genero) => ({
        generoId: genero.id,
      }));
    }

    return this.prismaService.livro.update({
      where: { id },
      data: {
        ...updateLivroDto,
        generos: {
          create: generosParaAdicionar,
        },
      },
      include: {
        generos: {
          select: {
            genero: true,
          },
        },
      },
    });
  }

  async remove(id: number) {
    await this.prismaService.generoLivro.deleteMany({
      where: { livroId: id },
    });

    return this.prismaService.livro.delete({ where: { id } });
  }

  private async preloadGeneroByName(genero: string) {
    const existingGenero = await this.prismaService.genero.findFirst({
      where: { nome: genero },
    });

    if (!existingGenero) {
      return await this.prismaService.genero.create({
        data: {
          nome: genero.charAt(0).toUpperCase() + genero.slice(1).toLowerCase(),
        },
      });
    }

    return existingGenero;
  }
}
