import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Player } from '../../players/schemas/player.schema';
import { Table } from './table.schema';
import { ApiProperty } from '@nestjs/swagger';

export type TablePlayerDocument = HydratedDocument<TablePlayer>;

@Schema({ collection: 'tables_players_collection' })
export class TablePlayer {
  @ApiProperty()
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Table', required: true })
  id_table: Table;

  @ApiProperty()
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Player', required: true })
  id_player: Player;
}

export const TablePlayerSchema = SchemaFactory.createForClass(TablePlayer);
