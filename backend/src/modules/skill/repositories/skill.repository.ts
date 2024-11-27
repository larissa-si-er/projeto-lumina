import { Injectable } from '@nestjs/common';
import { CreateSkillDto } from 'src/domain/dtos/skill/create-skill.dto';
import { PrismaService } from 'src/infra/database/prisma/prisma.service';

@Injectable()
export class SkillRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(createSkillDto: CreateSkillDto) {
    // Cria uma nova skill no banco de dados
    return await this.prisma.skill.create({
      data: {
        name: createSkillDto.name,
      },
    });
  }
}
