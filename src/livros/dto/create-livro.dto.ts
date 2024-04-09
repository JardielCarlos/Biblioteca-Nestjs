import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class CreateLivroDto {

  @IsNotEmpty()
  @IsString()
  titulo: string;

  @IsNotEmpty()
  @IsString()
  autor: string;

  @IsNotEmpty()
  @IsString()
  editora: string;

  @IsNotEmpty()
  @IsNumber()
  ano: number;

  @Min(1)
  @IsNotEmpty()
  @IsNumber()
  paginas: number;

  @IsNotEmpty()
  @IsString()
  genero: string;

  @IsNotEmpty()
  @IsString()
  sinopse: string;

  @IsNotEmpty()
  @IsBoolean()
  emprestado: boolean;

  @IsOptional()
  @IsNumber()
  @Min(1)
  idUsuario?: number;
}
