import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Table, TableSchema } from './schemas/table.schema';
import { TablePlayer, TablePlayerSchema } from './schemas/table-player.schema';
import { TablesController } from './tables.controller';
import { TablesService } from './tables.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Table.name, schema: TableSchema },
      { name: TablePlayer.name, schema: TablePlayerSchema },
    ]),
  ],
  controllers: [TablesController],
  providers: [TablesService],
})
export class TablesModule {}
