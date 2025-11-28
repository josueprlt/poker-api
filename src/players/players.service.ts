import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Player, PlayerDocument } from "./schemas/player.schema";

@Injectable()
export class PlayersService {
  constructor(
    @InjectModel(Player.name) private playerModel: Model<PlayerDocument>,
  ) {}
  async create(
    username: string,
    passwordHash: string,
  ): Promise<PlayerDocument> {
    const createdPlayer = new this.playerModel({
      username: username,
      password: passwordHash,
    });
    return createdPlayer.save();
  }

  async findOne(username: string): Promise<PlayerDocument | null> {
    return this.playerModel.findOne({ username: username }).exec();
  }
}
