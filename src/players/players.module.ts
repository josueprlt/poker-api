import { Module } from '@nestjs/common';
import { PlayersService } from './players.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Player, PlayerSchema } from './schemas/player.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Player.name, schema: PlayerSchema }]),
  ],
  providers: [PlayersService],
  exports: [PlayersService],
})
export class PlayersModule {}
