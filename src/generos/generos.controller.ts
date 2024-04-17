import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateGeneroDto } from './dto/create-genero.dto';
import { UpdateGeneroDto } from './dto/update-genero.dto';
import { GenerosService } from './generos.service';
import { AuthGuard } from '@nestjs/passport';
import { AdminGuard } from 'src/auth/guards/admin-guard';

@Controller('generos')
export class GenerosController {
  constructor(private readonly generosService: GenerosService) {}

  @Post()
  create(@Body() createGeneroDto: CreateGeneroDto) {
    return this.generosService.create(createGeneroDto);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'), AdminGuard)
  findAll() {
    return this.generosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.generosService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateGeneroDto: UpdateGeneroDto) {
    return this.generosService.update(id, updateGeneroDto);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: number) {
    return this.generosService.remove(id);
  }
}
