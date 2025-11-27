import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, Length } from '@nestjs/class-validator';

export class PlayersDto {
  @ApiProperty()
  @IsString({ always: true })
  @Length(2, 50, {
    message:
      "Veuillez saisir un nom d'utilisateur compris entre 2 et 50 charactères.",
  })
  username: string;

  @ApiProperty()
  @IsString({ always: true })
  password: string;

  @ApiProperty({ default: 1000 })
  @IsNumber()
  balance: number;
}
