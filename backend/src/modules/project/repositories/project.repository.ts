// import { Injectable } from '@nestjs/common';
// import { Prisma } from '@prisma/client';
// import { RepositoryFactory } from 'src/common/factories';
// import { CreateProjectDto } from 'src/domain/dtos/project/create-project.dto';
// import { ProjectEntity } from 'src/domain/entities';

// @Injectable()
// export class ProjectRepository extends RepositoryFactory<
//   ProjectEntity,
//   CreateProjectDto,
//   any
// > {
//   constructor() {
//     super('project');
//   }

//   async createProject(data: CreateProjectDto): Promise<ProjectEntity> {
//     const project = await this.prismaService.project.create({
//       data: {
//         ...data,
//         resources: data.resources || [],
//         skillsRequired: {
//           connect: data.skillsRequired?.map((id) => ({ id })),
//         },
//         tasks: {
//           connect: data.tasks?.map((id) => ({ id })),
//         },
//       },
//     });

//     return {
//       ...project,
//       address: project.address as Prisma.JsonValue,
//       resources: project.resources as Prisma.JsonValue[], // Cast para alinhar com o tipo
//     };
//   }
// }
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { RepositoryFactory } from 'src/common/factories';
import { CreateProjectDto } from 'src/domain/dtos/project/create-project.dto';
import { ProjectEntity } from 'src/domain/entities';

@Injectable()
export class ProjectRepository extends RepositoryFactory<
  ProjectEntity,
  CreateProjectDto,
  any
> {
  constructor() {
    super('project');
  }

  // Método para criar um novo projeto
  //   async create(data: CreateProjectDto): Promise<ProjectEntity> {
  //     const project = await this.prismaService.project.create({
  //       data: {
  //         ...data,
  //         resources: data.resources || [], // Inicializa os recursos
  //         skillsRequired: {
  //           connect: data.skillsRequired?.map((id) => ({ id })) || [], // Conexão de skills
  //         },
  //         tasks: {
  //           connect: data.tasks?.map((id) => ({ id })) || [], // Conexão de tarefas
  //         },
  //         participants: {
  //           connect: data.participants?.map((id) => ({ id })) || [], // Conexão de participantes
  //         },
  //       },
  //     });

  //     return {
  //       ...project,
  //       address: project.address as Prisma.JsonValue,
  //       resources: project.resources as Prisma.JsonValue[], // Cast para alinhar tipos
  //     };
  //   }
  async create(data: CreateProjectDto): Promise<ProjectEntity> {
    // Verificar se existem skills, tarefas e participantes
    const skillsToConnect = data.skillsRequired?.map((id) => ({ id })) || [];
    const tasksToConnect = data.tasks?.map((id) => ({ id })) || [];
    const participantsToConnect =
      data.participants?.map((id) => ({ id })) || [];

    const project = await this.prismaService.project.create({
      data: {
        ...data,
        resources: data.resources || [],
        skillsRequired:
          skillsToConnect.length > 0 ? { connect: skillsToConnect } : undefined,
        tasks:
          tasksToConnect.length > 0 ? { connect: tasksToConnect } : undefined,
        participants:
          participantsToConnect.length > 0
            ? { connect: participantsToConnect }
            : undefined,
      },
    });

    return {
      ...project,
      address: project.address as Prisma.JsonValue,
      resources: project.resources as Prisma.JsonValue[],
    };
  }

  // Método para buscar todos os projetos
  async findAll(): Promise<ProjectEntity[]> {
    const projects = await this.prismaService.project.findMany({
      include: {
        skillsRequired: true,
        participants: true,
        tasks: true,
      },
    });

    return projects.map((project) => ({
      ...project,
      address: project.address as Prisma.JsonValue,
      resources: project.resources as Prisma.JsonValue[],
    }));
  }
}
