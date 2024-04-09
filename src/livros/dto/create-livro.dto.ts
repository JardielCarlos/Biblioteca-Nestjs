import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

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
  @IsString({ each: true })
  generos: string[];

  @IsNotEmpty()
  @IsString()
  sinopse: string;

  @IsOptional()
  @IsNumber()
  @Min(1)
  idUsuario?: number;
}
