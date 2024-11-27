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
//ESSE TA FUNCIONANDOOOOOOOOOOOOOOOO UM POUCO:
// import { Injectable } from '@nestjs/common';
// import { CreateProjectDto } from 'src/domain/dtos/project/create-project.dto';
// import { ProjectEntity } from 'src/domain/entities/project/project.entity';
// import { ProjectRepository } from '../repositories/project.repository';

// @Injectable()
// export class ProjectService {
//   constructor(private readonly projectRepository: ProjectRepository) {}

//   // Método para criar projeto
//   async create(data: CreateProjectDto): Promise<ProjectEntity> {
//     return this.projectRepository.create(data);
//   }

//   // Método para buscar todos os projetos
//   async findAll(): Promise<ProjectEntity[]> {
//     return this.projectRepository.findAll();
//   }
// }
///////////////////////////////////////////////////////////////////
// import { Injectable } from '@nestjs/common';
// import { CreateProjectDto } from 'src/domain/dtos/project/create-project.dto';
// import { ProjectEntity } from 'src/domain/entities/project/project.entity';
// import { ProjectRepository } from '../repositories/project.repository';

// @Injectable()
// export class ProjectService {
//   constructor(private readonly projectRepository: ProjectRepository) {}

//   // Método para criar projeto
//   async create(data: CreateProjectDto): Promise<ProjectEntity> {
//     return this.projectRepository.create(data);
//   }

//   // Método para buscar todos os projetos
//   async findAll(): Promise<ProjectEntity[]> {
//     return this.projectRepository.findAll();
//   }
// }
/////////////-------------------
// import { Injectable } from '@nestjs/common';
// import { ProjectRepository } from '../repositories/project.repository';

// @Injectable()
// export class ProjectService {
//   constructor(private readonly projectRepository: ProjectRepository) {}

//   async addSkillsToProject(
//     projectId: string,
//     skillIds: string[],
//   ): Promise<void> {
//     const skills = skillIds.map((id) => ({ id })); // Transforma IDs em objetos no formato esperado pelo repositório
//     await this.projectRepository.addSkillsToProject(projectId, skills);
//   }
// }
// import { Injectable } from '@nestjs/common';
// import { CreateProjectDto } from 'src/domain/dtos/project/create-project.dto';
// import { UpdateProjectDto } from 'src/domain/dtos/project/update-project.dto';
// import { PrismaService } from 'src/infra/database/prisma/prisma.service';

// @Injectable()
// export class ProjectService {
//   constructor(private readonly prisma: PrismaService) {}

//   async create(createProjectDto: CreateProjectDto) {
//     const { skills, tasks, ...projectData } = createProjectDto;

//     const project = await this.prisma.project.create({
//       data: projectData,
//     });

//     if (skills?.length) {
//       await this.prisma.projectSkill.createMany({
//         data: skills.map((skillId) => ({
//           skillId,
//           projectId: project.id,
//         })),
//       });
//     }

//     if (tasks?.length) {
//       await this.prisma.task.createMany({
//         data: tasks.map((task) => ({
//           ...task,
//           projectId: project.id,
//         })),
//       });
//     }

//     return project;
//   }

//   async findOne(id: string) {
//     return this.prisma.project.findUnique({
//       where: { id },
//       include: { tasks: true, skillsRequired: { include: { skill: true } } },
//     });
//   }

//   async update(id: string, updateProjectDto: UpdateProjectDto) {
//     const { skills, tasks, ...projectData } = updateProjectDto;

//     const updatedProject = await this.prisma.project.update({
//       where: { id },
//       data: projectData,
//     });

//     if (skills) {
//       await this.prisma.projectSkill.deleteMany({ where: { projectId: id } });
//       await this.prisma.projectSkill.createMany({
//         data: skills.map((skillId) => ({
//           skillId,
//           projectId: id,
//         })),
//       });
//     }

//     if (tasks) {
//       await this.prisma.task.deleteMany({ where: { projectId: id } });
//       await this.prisma.task.createMany({
//         data: tasks.map((task) => ({
//           ...task,
//           projectId: id,
//         })),
//       });
//     }

//     return updatedProject;
//   }
// }
// import { Injectable } from '@nestjs/common';
// import { CreateProjectDto } from 'src/domain/dtos/project/create-project.dto';
// import { ProjectRepository } from '../repositories/project.repository';

// @Injectable()
// export class ProjectService {
//   constructor(private projectRepository: ProjectRepository) {}

//   async create(data: CreateProjectDto) {
//     return this.projectRepository.create(data);
//   }
// }
import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from 'src/domain/dtos/project/create-project.dto';
import { ProjectEntity } from 'src/domain/entities';
import { PrismaService } from 'src/infra/database/prisma/prisma.service';

@Injectable()
export class ProjectService {
  constructor(private readonly prisma: PrismaService) {}

  async createProject(
    createProjectDto: CreateProjectDto,
  ): Promise<ProjectEntity> {
    console.log('DTO recebido: ', createProjectDto);

    try {
      const createdProject = await this.prisma.project.create({
        data: {
          title: createProjectDto.title,
          area: createProjectDto.area,
          organization: createProjectDto.organization,
          organizationEmail: createProjectDto.organizationEmail,
          organizationPhone: createProjectDto.organizationPhone,
          startDate: createProjectDto.startDate,
          endDate: createProjectDto.endDate,
          totalSpots: createProjectDto.totalSpots,
          description: createProjectDto.description,
          mainImage: createProjectDto.mainImage || 'default_image_url',
          address: createProjectDto.address || null,
          tasks: {
            create: createProjectDto.tasks || [],
          },
          skillsRequired: {
            create:
              createProjectDto.skillsRequired?.map((name) => ({
                skill: {
                  connectOrCreate: { where: { name }, create: { name } },
                },
              })) || [],
          },
        },
        include: {
          tasks: true,
          skillsRequired: { include: { skill: true } },
        },
      });

      console.log('Projeto criado: ', createdProject);

      return {
        ...createdProject,
        skillsRequired: createdProject.skillsRequired.map((skillRelation) => ({
          id: skillRelation.skill.id,
          name: skillRelation.skill.name,
        })),
        tasks: createdProject.tasks.map((task) => ({
          id: task.id,
          name: task.name || '',
          description: task.description || '',
          status: task.status || '',
          createdBy: task.createdBy || '',
          assignedUid: task.assignedUid || '',
          projectId: task.projectId,
        })),
      };
    } catch (error) {
      console.error('Erro ao criar projeto: ', error.message);
      throw error;
    }
  }
}
