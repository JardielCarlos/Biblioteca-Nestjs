import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateGeneroDto } from './dto/create-genero.dto';
import { UpdateGeneroDto } from './dto/update-genero.dto';

@Injectable()
export class GenerosService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createGeneroDto: CreateGeneroDto) {
    return this.prismaService.genero.create({ data: { ...createGeneroDto, nome: createGeneroDto.nome.charAt(0).toUpperCase() + createGeneroDto.nome.slice(1).toLowerCase() } });
  }

  findAll() {
    return this.prismaService.genero.findMany();
  }

  findOne(id: number) {
    return this.prismaService.genero.findFirstOrThrow({ where: { id } });
  }

  update(id: number, updateGeneroDto: UpdateGeneroDto) {
    return this.prismaService.genero.update({
      where: { id },
      data: updateGeneroDto,
    });
  }

  async remove(id: number) {
    await this.prismaService.generoLivro.deleteMany({
      where: { generoId: id },
    });

    return this.prismaService.genero.delete({
      where: { id },
    });
  }
}
