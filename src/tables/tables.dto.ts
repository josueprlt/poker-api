import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, Length } from '@nestjs/class-validator';

export class TablesDto {
  @ApiProperty()
  @IsNumber()
  big_blind: number;

  @ApiProperty()
  @IsString({ always: true })
  @Length(2, 50, {
    message:
      'Veuillez saisir un nom de table compris entre 2 et 50 charactères.',
  })
  name: string;

  @ApiProperty()
  @IsNumber()
  small_blind: number;
}
