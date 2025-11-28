import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Table } from "./schemas/table.schema";
import { DeleteResult, Model, Types } from "mongoose";
import { TablePlayer } from "./schemas/table-player.schema";
import { Player } from "../players/schemas/player.schema";

@Injectable()
export class TablesService {
  constructor(
    @InjectModel(Table.name) private tableModel: Model<Table>,
    @InjectModel(TablePlayer.name) private tablePlayerModel: Model<TablePlayer>,
    @InjectModel(Player.name) private playerModel: Model<Player>,
  ) {}

  async findAll(): Promise<Table[]> {
    return this.tableModel.find().exec();
  }

  async findOne(id: string): Promise<Table | null> {
    return this.tableModel.findById(id).exec();
  }

  async joinTable(tableId: string, playerId: string) {
    const existingEntry = await this.tablePlayerModel.findOne({
      id_player: playerId as any,
    });

    if (existingEntry) {
      throw new BadRequestException("Vous êtes déjà assis à une table.");
    }

    await new this.tablePlayerModel({
      id_table: new Types.ObjectId(tableId),
      id_player: new Types.ObjectId(playerId),
    }).save();
  }

  async leaveTable(playerId: string): Promise<DeleteResult> {
    return this.tablePlayerModel
      .deleteMany({
        id_player: playerId as any,
      })
      .exec();
  }

  async startTable(tableId: string, playerId: string) {
    const existingEntry = await this.tablePlayerModel.findOne({
      id_player: playerId as any,
    });

    if (!existingEntry) {
      throw new BadRequestException(
        "Veuillez rejoindre une table avant de commencer.",
      );
    }

    function shuffle(array: any) {
      array.sort(() => Math.random() - 0.5);
    }

    function generateRandomDeck() {
      const icons = ["♣", "♦", "♥", "♠"];
      const numbers = [
        "A",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "J",
        "Q",
        "K",
      ];
      let cards = [];

      for (let i = 0; i < icons.length; i++) {
        for (let j = 0; j < numbers.length; j++) {
          cards.push(icons[i] + numbers[j]);
        }
      }

      shuffle(cards);
      return cards;
    }

    function generateRandomAI(TableArray: any, allDeck: any) {
      let ias = [];


      for (let i = 0; i < 3 - TableArray.length; i++) {
        ias.push({
          id: i + 1,
          name: "IA " + (i + 1),
          balance: 1000,
          deck: [allDeck[0], allDeck[1]],
        });
        for (let j = 0; j < 2; j++) {
          allDeck.shift();
        }
      }

      return ias;
    }

    const tables = await this.tablePlayerModel.find({
      id_table: tableId as any,
    });

    const deck = generateRandomDeck();
    const tablesArray = generateRandomAI(tables, deck);

    const player = await this.playerModel.find({
      _id: playerId as any,
    });

    await this.playerModel.updateOne(
      { _id: playerId },
      {
        deck: [deck[0], deck[1]],
      },
    );
    for (let i = 0; i < 2; i++) {
      deck.shift();
    }

    console.log(player);
    console.log(tablesArray);
    console.log(deck);
  }

  actionTable(tableId: string, action: string) {
    if (!(action === "fold" || action === "call" || action === "raise" || action === "check")) {
      throw new BadRequestException(
        "Action invalide. Action possible : fold, call, raise, check.",
      );
    }

    return "Vous avez fait un " + action + " sur la table de poker !";
  }

  statusTable(tableId: string) {
    return "Vous avez fait un " + tableId + " sur la table de poker !";
  }
}
