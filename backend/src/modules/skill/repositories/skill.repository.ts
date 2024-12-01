import { Injectable } from '@nestjs/common';
import { CreateSkillDto } from 'src/domain/dtos/skill/create-skill.dto';
import { SkillEntity } from 'src/domain/entities';
import { PrismaService } from 'src/infra/database/prisma/prisma.service';

@Injectable()
export class SkillRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateSkillDto): Promise<SkillEntity> {
    return this.prisma.skill.create({
      data: {
        name: dto.name,
      },
    });
  }

  // Método para buscar todas as skills
  async findAll(): Promise<SkillEntity[]> {
    return this.prisma.skill.findMany();
  }
}
