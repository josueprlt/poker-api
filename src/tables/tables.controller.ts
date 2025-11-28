import {
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Req,
  UseGuards,
} from "@nestjs/common";
import { TablesService } from "./tables.service";
import { Table } from "./schemas/table.schema";
import { ApiResponse } from "@nestjs/swagger";
import { AuthGuard } from "../auth/auth.guard";

@UseGuards(AuthGuard)
@Controller("tables")
export class TablesController {
  constructor(private readonly tablesService: TablesService) {}

  @ApiResponse({status: HttpStatus.OK, description: 'Récupération de toutes les tables de poker'})
  @ApiResponse({status: HttpStatus.UNAUTHORIZED, description: "Vous n'êtes pas autorisé à accèder à cette ressource"})
  @Get()
  async getAll(): Promise<Table[]> {
    return this.tablesService.findAll();
  }

  @ApiResponse({status: HttpStatus.OK, description: "Récupération d'une table de poker par rapport à son id"})
  @ApiResponse({status: HttpStatus.UNAUTHORIZED, description: "Vous n'êtes pas autorisé à accèder à cette ressource"})
  @ApiResponse({status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Internal server error'})
  @Get(':id')
  async getOne(@Param('id') id: string): Promise<Table | null> {
    return this.tablesService.findOne(id);
  }

  @ApiResponse({status: HttpStatus.CREATED, description: "Ajoute l'utilisateur logué à la table de poker"})
  @ApiResponse({status: HttpStatus.BAD_REQUEST, description: 'Vous êtes déjà assis à une table.'})
  @ApiResponse({status: HttpStatus.UNAUTHORIZED, description: "Vous n'êtes pas autorisé à accèder à cette ressource"})
  @ApiResponse({status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Internal server error'})
  @Post(':id/join')
  async joinTable(@Param('id') tableId: string, @Req() req: any) {
    const userId = req.user.sub;
    return this.tablesService.joinTable(tableId, userId);
  }

  @ApiResponse({status: HttpStatus.OK, description: "Supprime l'utilisateur logué à toutes les tables de poker"})
  @ApiResponse({status: HttpStatus.UNAUTHORIZED, description: "Vous n'êtes pas autorisé à accèder à cette ressource"})
  @ApiResponse({status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Internal server error'})
  @Delete('/leave')
  async leaveTable(@Req() req: any) {
    const userId = req.user.sub;
    return this.tablesService.leaveTable(userId);
  }

  @ApiResponse({status: HttpStatus.OK, description: "Status de la partie"})
  @ApiResponse({status: HttpStatus.UNAUTHORIZED, description: "Vous n'êtes pas autorisé à accèder à cette ressource"})
  @ApiResponse({status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Internal server error'})
  @Get(':id/game')
  async statusTable(@Param('id') tableId: string) {
    return this.tablesService.statusTable(tableId);
  }

  @ApiResponse({status: HttpStatus.OK, description: "Lance la partie de poker"})
  @ApiResponse({status: HttpStatus.BAD_REQUEST, description: "Veuillez rejoindre une table avant de commencer."})
  @ApiResponse({status: HttpStatus.UNAUTHORIZED, description: "Vous n'êtes pas autorisé à accèder à cette ressource"})
  @ApiResponse({status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Internal server error'})
  @Get(':id/game/start')
  async startTable(@Param('id') tableId: string, @Req() req: any) {
    const userId = req.user.sub;
    return this.tablesService.startTable(tableId, userId);
  }

  @ApiResponse({status: HttpStatus.OK, description: "Faire une action sur la table de poker (fold, call, raise, check)"})
  @ApiResponse({status: HttpStatus.UNAUTHORIZED, description: "Vous n'êtes pas autorisé à accèder à cette ressource"})
  @ApiResponse({status: HttpStatus.BAD_REQUEST, description: 'Action invalide. Action possible : fold, call, raise, check.'})
  @ApiResponse({status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Internal server error'})
  @Get(':id/game/:action')
  async actionTable(@Param('id') tableId: string, @Param('action') action: string) {
    return this.tablesService.actionTable(tableId, action);
  }
}
