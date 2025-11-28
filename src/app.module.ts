import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { Table, TableSchema } from "./tables/schemas/table.schema";
import { TablesService } from "./tables/tables.service";
import { TablesController } from "./tables/tables.controller";
import { AuthModule } from "./auth/auth.module";
import { PlayersModule } from "./players/players.module";
import { TablesModule } from "./tables/tables.module";
import {
  TablePlayer,
  TablePlayerSchema,
} from "./tables/schemas/table-player.schema";
import { Player, PlayerSchema } from "./players/schemas/player.schema";

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(
      `mongodb://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@mongodb:27017/poker_db?authSource=admin`,
    ),
    MongooseModule.forFeature([
      { name: Table.name, schema: TableSchema },
      { name: TablePlayer.name, schema: TablePlayerSchema },
      { name: Player.name, schema: PlayerSchema },
    ]),
    AuthModule,
    PlayersModule,
    TablesModule,
  ],
  controllers: [AppController, TablesController],
  providers: [AppService, TablesService],
})
export class AppModule {}
