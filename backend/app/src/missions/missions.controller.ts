import { Controller, Get, Post, Patch, Delete, Param, Body } from '@nestjs/common';
import { MissionsService } from './missions.service';
import { MissionStatus } from './mission.entity';

@Controller('missions')
export class MissionsController {
  constructor(private readonly missionsService: MissionsService) {}

  @Get()
  findAll() {
    return this.missionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.missionsService.findOne(+id);
  }

  @Post()
  create(
    @Body()
    body: {
      titre: string;
      description?: string;
      adresseDepart: string;
      adresseArrivee: string;
      dateDepart?: Date;
      dateLivraison?: Date;
      chauffeurId?: number;
    },
  ) {
    return this.missionsService.create(body);
  }

  @Patch(':id/status')
  updateStatus(
    @Param('id') id: string,
    @Body() body: { status: MissionStatus },
  ) {
    return this.missionsService.updateStatus(+id, body.status);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.missionsService.remove(+id);
  }
}