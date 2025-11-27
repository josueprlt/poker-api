import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PlayersModule } from '../players/players.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PlayersModule,
    JwtModule.register({
      global: true,
      secret: process.env.SECRET,
      signOptions: { expiresIn: '5000s' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
