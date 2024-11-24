import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateSkillDto } from 'src/domain/dtos/skill/create-skill.dto';
import { SkillEntity } from 'src/domain/entities/skill/skill.entity';
import { SkillService } from '../services/skill.service';

@Controller('skills')
export class SkillController {
  constructor(private readonly skillService: SkillService) {}

  @Post()
  async create(@Body() createSkillDto: CreateSkillDto): Promise<SkillEntity> {
    return this.skillService.create(createSkillDto);
  }

  @Get()
  async findAll(): Promise<SkillEntity[]> {
    return this.skillService.findAll();
  }
}
