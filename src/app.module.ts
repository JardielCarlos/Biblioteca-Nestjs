import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LivrosModule } from './livros/livros.module';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsuariosModule } from './usuarios/usuarios.module';

@Module({
  imports: [LivrosModule, PrismaModule, UsuariosModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
