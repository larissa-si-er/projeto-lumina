// import { Body, Controller, Post } from '@nestjs/common';
// import { CreateProjectDto } from 'src/domain/dtos/project/create-project.dto';
// import { ProjectEntity } from 'src/domain/entities';
// import { ProjectService } from '../services/project.service';

// @Controller('projects')
// export class ProjectController {
//   constructor(private readonly projectService: ProjectService) {}

//   @Post()
//   async createProject(
//     @Body() createProjectDto: CreateProjectDto,
//   ): Promise<ProjectEntity> {
//     return this.projectService.createProject(createProjectDto);
//   }
// }
import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateProjectDto } from 'src/domain/dtos/project/create-project.dto';
import { ProjectEntity } from 'src/domain/entities/project/project.entity';
import { ProjectService } from '../services/project.service';

@Controller('projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  async create(
    @Body() createProjectDto: CreateProjectDto,
  ): Promise<ProjectEntity> {
    return this.projectService.create(createProjectDto);
  }

  @Get()
  async findAll(): Promise<ProjectEntity[]> {
    return this.projectService.findAll();
  }
}
