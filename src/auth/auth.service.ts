import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { PlayersService } from '../players/players.service';
import { JwtService } from '@nestjs/jwt';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(
    private playersService: PlayersService,
    private jwtService: JwtService,
  ) {}

  async signUp(username: string, pass: string) {
    let player = await this.playersService.findOne(username);
    if (player) {
      throw new BadRequestException('Le Username existe déjà');
    }

    const salt = randomBytes(8).toString('hex');
    const hash = (await scrypt(pass, salt, 32)) as Buffer;
    const result = salt + '.' + hash.toString('hex');
    player = await this.playersService.create(username, result);
    return player;
  }

  async signIn(
    username: string,
    pass: string,
  ): Promise<{ access_token: string }> {
    const player = await this.playersService.findOne(username);

    if (!player) {
      throw new UnauthorizedException('Identifiants invalides');
    }

    const [salt, storedHash] = player.password.split('.');
    const hash = (await scrypt(pass, salt, 32)) as Buffer;

    if (storedHash !== hash.toString('hex')) {
      throw new UnauthorizedException('Identifiants invalides');
    }
    const payload = { sub: player._id, username: player.username };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
