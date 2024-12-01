import { Injectable } from '@nestjs/common';
import { CreateSkillDto } from 'src/domain/dtos/skill/create-skill.dto';
import { SkillRepository } from '../repositories/skill.repository';

@Injectable()
export class SkillService {
  constructor(private readonly skillRepository: SkillRepository) {}

  // Criar uma ou várias habilidades
  async createSkills(dtos: CreateSkillDto | CreateSkillDto[]) {
    const dtosArray = Array.isArray(dtos) ? dtos : [dtos];
    const createdSkills = await Promise.all(
      dtosArray.map((dto) => this.skillRepository.create(dto)),
    );
    return createdSkills;
  }

  // Listar todas as habilidades existentes
  async findAll() {
    return this.skillRepository.findAll();
  }
}
