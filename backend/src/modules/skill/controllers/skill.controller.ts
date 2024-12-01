import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateSkillDto } from 'src/domain/dtos/skill/create-skill.dto';
import { ProjectService } from 'src/modules/project/services/project.service'; // Importando o serviço de projeto
import { SkillService } from 'src/modules/skill/services/skill.service';

@Controller('skills')
export class SkillController {
  constructor(
    private readonly skillService: SkillService,
    private readonly projectService: ProjectService,
  ) {}

  @Post()
  async create(@Body() createSkillDto: CreateSkillDto | CreateSkillDto[]) {
    return this.skillService.createSkills(createSkillDto);
  }

  @Get()
  async findAll() {
    return this.skillService.findAll();
  }

  @Post('assign-to-project/:projectId')
  async assignSkillToProject(
    @Param('projectId') projectId: string,
    @Body() skills: string[],
  ) {
    return this.projectService.assignSkillsToProject(projectId, skills);
  }
}
