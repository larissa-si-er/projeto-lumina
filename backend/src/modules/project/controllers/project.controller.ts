import {
  BadRequestException,
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
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

  @Post(':projectId/subscribe')
  async subscribeToProject(
    @Param('projectId') projectId: string,
    @Body() body: { userId: string },
  ) {
    const { userId } = body;

    const project = await this.projectService.getProjectById(projectId);
    if (!project) {
      throw new NotFoundException('Projeto não encontrado');
    }

    if (project.availableSpots <= 0) {
      throw new BadRequestException('Não há vagas disponíveis neste projeto.');
    }

    const alreadyParticipant = await this.projectService.checkParticipant(
      projectId,
      userId,
    );
    if (alreadyParticipant) {
      throw new BadRequestException('Usuário já inscrito neste projeto.');
    }

    await this.projectService.addParticipant(projectId, userId);

    return { message: 'Inscrição realizada com sucesso!' };
  }
}
