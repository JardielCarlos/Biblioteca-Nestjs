import { Module } from '@nestjs/common';
import { GenerosService } from './generos.service';
import { GenerosController } from './generos.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [GenerosController],
  providers: [GenerosService],
})
export class GenerosModule {}
