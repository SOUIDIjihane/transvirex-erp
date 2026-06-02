import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Mission, MissionStatus } from './mission.entity';

@Injectable()
export class MissionsService {
  constructor(
    @InjectRepository(Mission)
    private missionsRepository: Repository<Mission>,
  ) {}

  async findAll(): Promise<Mission[]> {
    return this.missionsRepository.find();
  }

  async findOne(id: number): Promise<Mission> {
    const mission = await this.missionsRepository.findOne({ where: { id } });
    if (!mission) throw new NotFoundException(`Mission ${id} introuvable`);
    return mission;
  }

  async create(data: {
    titre: string;
    description?: string;
    adresseDepart: string;
    adresseArrivee: string;
    dateDepart?: Date;
    dateLivraison?: Date;
    chauffeurId?: number;
  }): Promise<Mission> {
    const mission = this.missionsRepository.create({
      ...data,
      chauffeur: data.chauffeurId ? { id: data.chauffeurId } as any : undefined,
    });
    return this.missionsRepository.save(mission);
  }

  async updateStatus(id: number, status: MissionStatus): Promise<Mission> {
    const mission = await this.findOne(id);
    mission.status = status;
    return this.missionsRepository.save(mission);
  }

  async remove(id: number): Promise<void> {
    await this.missionsRepository.delete(id);
  }
}