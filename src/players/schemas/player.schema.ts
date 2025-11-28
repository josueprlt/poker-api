import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { ApiProperty } from "@nestjs/swagger";

export type PlayerDocument = Player & Document;

@Schema({ collection: "players_collection" })
export class Player {
  @ApiProperty({ required: true, uniqueItems: true })
  @Prop({ required: true, unique: true })
  username: string;

  @ApiProperty({ required: true })
  @Prop({ required: true })
  password: string;

  @ApiProperty({ default: 1000 })
  @Prop({ default: 1000 })
  balance: number;

  @ApiProperty()
  @Prop()
  deck: [];
}

export const PlayerSchema = SchemaFactory.createForClass(Player);
