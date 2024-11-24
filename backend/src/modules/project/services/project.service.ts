// import { Injectable } from '@nestjs/common';
// import { CreateProjectDto } from 'src/domain/dtos/project/create-project.dto';
// import { ProjectEntity } from 'src/domain/entities/project/project.entity';
// import { ProjectRepository } from '../repositories/project.repository';

// @Injectable()
// export class ProjectService {
//   constructor(private readonly projectRepository: ProjectRepository) {}

//   // Método para criar um novo projeto
//   async create(data: CreateProjectDto): Promise<ProjectEntity> {
//     return this.projectRepository.create(data);
//   }

//   // Método para buscar todos os projetos
//   async findAll(): Promise<ProjectEntity[]> {
//     return this.projectRepository.findAll();
//   }
// }
import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from 'src/domain/dtos/project/create-project.dto';
import { ProjectEntity } from 'src/domain/entities/project/project.entity';
import { ProjectRepository } from '../repositories/project.repository';

@Injectable()
export class ProjectService {
  constructor(private readonly projectRepository: ProjectRepository) {}

  // Método para criar projeto
  async create(data: CreateProjectDto): Promise<ProjectEntity> {
    return this.projectRepository.create(data);
  }

  // Método para buscar todos os projetos
  async findAll(): Promise<ProjectEntity[]> {
    return this.projectRepository.findAll();
  }
}
