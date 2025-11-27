
import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { PlayersService } from '../players/players.service';
import { SkipAuth } from './decorators/skip-auth/decorator';
import { ApiResponse } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private playerService: PlayersService,
  ) {}

  @SkipAuth()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Compte créé avec succès !',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Le nom du joueur existe déjà',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error',
  })
  @HttpCode(HttpStatus.OK)
  @Post('signup')
  async signUp(@Body() signUpDto: Record<string, any>) {
    const player = await this.playerService.findOne(signUpDto.username);
    if (player != undefined) {
      throw new BadRequestException('Username already exists');
    }
    this.authService.signUp(signUpDto.username, signUpDto.password);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Connexion à votre compte avec succès !',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Identifiants invalides',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error',
  })
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: Record<string, any>) {
    return this.authService.signIn(signInDto.username, signInDto.password);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: "Récupération du profil de l'utilisateur grâce au token JWT",
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: "Vous n'êtes pas autorisé à accèder à cette ressource",
  })
  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req: any) {
    return req.user;
  }
}
