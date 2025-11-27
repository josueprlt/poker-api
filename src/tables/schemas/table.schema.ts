import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type TableDocument = HydratedDocument<Table>;

@Schema({ collection: 'tables_collection' })
export class Table {
  @ApiProperty()
  @Prop()
  big_blind: number;

  @ApiProperty()
  @Prop()
  name: string;

  @ApiProperty()
  @Prop()
  small_blind: number;
}

export const TableSchema = SchemaFactory.createForClass(Table);
