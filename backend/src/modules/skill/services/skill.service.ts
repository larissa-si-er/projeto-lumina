import { Injectable } from '@nestjs/common';
import { CreateSkillDto } from 'src/domain/dtos/skill/create-skill.dto';
import { SkillEntity } from 'src/domain/entities/skill/skill.entity';
import { SkillRepository } from '../repositories/skill.repository';

@Injectable()
export class SkillService {
  constructor(private readonly skillRepository: SkillRepository) {}

  create(data: CreateSkillDto): Promise<SkillEntity> {
    return this.skillRepository.createSkill(data);
  }

  findAll(): Promise<SkillEntity[]> {
    return this.skillRepository.findAllSkills();
  }
}
