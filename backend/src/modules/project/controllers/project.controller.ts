import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateProjectDto } from 'src/domain/dtos/project/create-project.dto';
import { ProjectEntity } from 'src/domain/entities';
import { ProjectService } from '../services/project.service';

@Controller('projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  async createProject(
    @Body() createProjectDto: CreateProjectDto,
  ): Promise<ProjectEntity> {
    console.log('Dados recebidos no Controller: ', createProjectDto);
    return this.projectService.createProject(createProjectDto);
  }

  @Post('skills')
  async addSkillsToProject(
    @Body() payload: { projectId: string; skills: string[] },
  ) {
    const { projectId, skills } = payload;
    return this.projectService.addSkillsToProject(projectId, skills);
  }

  // GET - buscar projetos
  @Get()
  async getAllProjects() {
    return this.projectService.getAllProjects();
  }

  @Get(':id')
  async getProjectById(@Param('id') id: string) {
    return this.projectService.getProjectById(id);
  }
}
