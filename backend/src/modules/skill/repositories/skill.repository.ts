import { Injectable } from '@nestjs/common';
import { RepositoryFactory } from 'src/common/factories';
import { CreateSkillDto } from 'src/domain/dtos/skill/create-skill.dto';
import { SkillEntity } from 'src/domain/entities/skill/skill.entity';

@Injectable()
export class SkillRepository extends RepositoryFactory<
  SkillEntity,
  CreateSkillDto,
  any
> {
  constructor() {
    super('skill');
  }

  async createSkill(data: CreateSkillDto): Promise<SkillEntity> {
    return this.prismaService.skill.create({
      data,
    });
  }

  async findAllSkills(): Promise<SkillEntity[]> {
    return this.prismaService.skill.findMany();
  }
}
