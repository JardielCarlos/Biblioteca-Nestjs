import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Request } from 'express';
import { sign } from 'jsonwebtoken';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsuarioEntity } from 'src/usuarios/entities/usuario.entity';
import { LoginDto } from './dto/create-loginDto';
import { JwtPayload } from './models/jwt-payload.model';

@Injectable()
export class AuthService {
  constructor(private readonly prismaService: PrismaService) { }

  async login(loginDto: LoginDto) {
    const user = await this.findByEmail(loginDto.email);
    const match = await this.checkPassword(loginDto.senha, user);

    if (!match) {
      throw new NotFoundException('User not found');
    }

    const jwtToken = await this.createAcessToken(user);
    return { token: jwtToken };
  }

  public async createAcessToken(user: UsuarioEntity) {
    return sign(
      { id: user.id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRATION
    });
  }

  public async validateUser(jwtPayload: JwtPayload) {
    const user = await this.prismaService.usuario.findFirst({
      where: { id: jwtPayload.id }
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  private async findByEmail(email: string): Promise<UsuarioEntity> {
    const user = await this.prismaService.usuario.findFirst({ where: { email } });

    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  private jwtExtractor(request: Request): string {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      throw new BadRequestException('Is not Token');
    }

    const [, token] = authHeader.split(' ');
    return token;
  }

  private async checkPassword(password: string, user: UsuarioEntity): Promise<boolean> {
    const match = await bcrypt.compare(password, user.senha);
    return match;
  }

  public returnJwtExtractor(): (request: Request) => string {
    return this.jwtExtractor;
  }
}
