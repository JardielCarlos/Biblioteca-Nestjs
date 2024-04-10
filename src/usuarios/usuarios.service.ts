import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';

@Injectable()
export class UsuariosService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createUsuarioDto: CreateUsuarioDto) {
    const hashedPassword = await bcrypt.hash(createUsuarioDto.senha, 10);
    return this.prismaService.usuario.create({
      data: { ...createUsuarioDto, senha: hashedPassword },
      select: { id: true, nome: true, email: true, role: true },
    });
  }

  findAll() {
    return this.prismaService.usuario.findMany({
      select: { id: true, nome: true, email: true, role: true },
    });
  }

  findOne(id: number) {
    return this.prismaService.usuario.findFirst({
      where: { id },
      select: { id: true, nome: true, email: true, role: true },
    });
  }

  update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    return this.prismaService.usuario.update({
      where: { id },
      data: updateUsuarioDto,
      select: { id: true, nome: true, email: true, role: true },
    });
  }

  remove(id: number) {
    return this.prismaService.usuario.delete({ where: { id } });
  }

  
}
