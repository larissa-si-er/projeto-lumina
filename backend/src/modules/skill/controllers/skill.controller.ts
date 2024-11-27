import { Body, Controller, Post } from '@nestjs/common';
import { CreateSkillDto } from 'src/domain/dtos/skill/create-skill.dto';
import { SkillService } from 'src/modules/skill/services/skill.service';

@Controller('skills')
export class SkillController {
  constructor(private readonly skillService: SkillService) {}

  @Post()
  async create(@Body() createSkillDto: CreateSkillDto | CreateSkillDto[]) {
    return this.skillService.createSkills(createSkillDto);
  }
}
