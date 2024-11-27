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

//   // Método para criar um novo projeto
//   // async create(data: CreateProjectDto): Promise<ProjectEntity> {
//   //   const skillsToConnect = data.skillsRequired?.connect || [];
//   //   const tasksToConnect = data.tasks?.connect || [];
//   //   const participantsToConnect = data.participants?.connect || [];

//   //   const project = await this.prismaService.project.create({
//   //     data: {
//   //       ...data,
//   //       resources: data.resources || [],
//   //       skillsRequired:
//   //         skillsToConnect.length > 0 ? { connect: skillsToConnect } : undefined,
//   //       tasks:
//   //         tasksToConnect.length > 0 ? { connect: tasksToConnect } : undefined,
//   //       participants:
//   //         participantsToConnect.length > 0
//   //           ? { connect: participantsToConnect }
//   //           : undefined,
//   //     },
//   //   });

//   //   return {
//   //     ...project,
//   //     address: project.address as Prisma.JsonValue,
//   //     resources: project.resources as Prisma.JsonValue[],
//   //   };
//   // }
//   async create(data: CreateProjectDto): Promise<ProjectEntity> {
//     const skillsToConnect = data.skillsRequired?.connect || [];
//     const tasksToConnect = data.tasks?.connect || [];
//     const participantsToConnect = data.participants?.connect || [];

//     // Garantir que a data e hora estão formatadas corretamente
//     const startDate = new Date(data.startDate).toISOString().split('T')[0]; // Apenas a data (YYYY-MM-DD)
//     const endDate = new Date(data.endDate).toISOString().split('T')[0]; // Apenas a data (YYYY-MM-DD)

//     const startTime = data.startTime; // Hora (HH:mm)
//     const endTime = data.endTime; // Hora (HH:mm)

//     const secondaryImages = Array.isArray(data.secondaryImages)
//       ? data.secondaryImages
//       : [data.secondaryImages]; // Garantir que seja um array

//     // Corrigir o campo resources para ser um array de strings ou um objeto JSON
//     const resources = Array.isArray(data.resources)
//       ? data.resources
//       : [data.resources]; // Agora é um array de strings ou um objeto JSON

//     const project = await this.prismaService.project.create({
//       data: {
//         title: data.title,
//         area: data.area,
//         organization: data.organization,
//         organizationEmail: data.organizationEmail,
//         organizationPhone: data.organizationPhone,
//         // startDate: data.startDate,
//         // endDate: data.endDate,
//         startDate, // Apenas a data
//         endDate, // Apenas a data
//         startTime, // Hora de início
//         endTime, // Hora de término
//         totalSpots: data.totalSpots,
//         description: data.description,
//         mainImage: data.mainImage,
//         secondaryImages, // um array de strings
//         resources,
//         skillsRequired:
//           skillsToConnect.length > 0 ? { connect: skillsToConnect } : undefined,
//         tasks:
//           tasksToConnect.length > 0 ? { connect: tasksToConnect } : undefined,
//         participants:
//           participantsToConnect.length > 0
//             ? { connect: participantsToConnect }
//             : undefined,
//       },
//     });

//     return {
//       ...project,
//       address: project.address as Prisma.JsonValue,
//       resources: project.resources as Prisma.JsonValue[],
//     };
//   }

//   // Método para buscar todos os projetos
//   async findAll(): Promise<ProjectEntity[]> {
//     const projects = await this.prismaService.project.findMany({
//       include: {
//         skillsRequired: true,
//         participants: {
//           include: { user: true }, // Incluindo dados do usuário participante
//         },
//         tasks: true,
//       },
//     });

//     return projects.map((project) => ({
//       ...project,
//       address: project.address as Prisma.JsonValue,
//       resources: project.resources as Prisma.JsonValue[],

//       skillsRequired: project.skillsRequired, // Incluir habilidades
//       tasks: project.tasks, // Incluir tarefas
//       participants: project.participants, // Incluir participantes
//     }));
//   }
// }

/////////////////////////////////////////////////////////
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

//   // Método para criar um novo projeto
//   async create(data: CreateProjectDto): Promise<ProjectEntity> {
//     const skillsToConnect = data.skillsRequired?.connect || [];
//     const tasksToConnect = data.tasks?.connect || [];
//     const participantsToConnect = data.participants?.connect || [];

//     // Garantir que a data e hora estão formatadas corretamente
//     const startDate = new Date(data.startDate).toISOString().split('T')[0]; // Apenas a data (YYYY-MM-DD)
//     const endDate = new Date(data.endDate).toISOString().split('T')[0]; // Apenas a data (YYYY-MM-DD)

//     const startTime = data.startTime; // Hora (HH:mm)
//     const endTime = data.endTime; // Hora (HH:mm)

//     const secondaryImages = Array.isArray(data.secondaryImages)
//       ? data.secondaryImages
//       : [data.secondaryImages]; // Garantir que seja um array

//     // Corrigir o campo resources para ser um array de strings ou um objeto JSON
//     const resources = Array.isArray(data.resources)
//       ? data.resources
//       : [data.resources]; // Agora é um array de strings ou objetos JSON

//     const project = await this.prismaService.project.create({
//       data: {
//         title: data.title,
//         area: data.area,
//         organization: data.organization,
//         organizationEmail: data.organizationEmail,
//         organizationPhone: data.organizationPhone,
//         startDate, // Apenas a data
//         endDate, // Apenas a data
//         startTime, // Hora de início
//         endTime, // Hora de término
//         totalSpots: data.totalSpots,
//         description: data.description,
//         mainImage: data.mainImage,
//         secondaryImages, // um array de strings
//         resources, // Passando o array de recursos para o banco de dados
//         skillsRequired:
//           skillsToConnect.length > 0 ? { connect: skillsToConnect } : undefined,
//         tasks:
//           tasksToConnect.length > 0 ? { connect: tasksToConnect } : undefined,
//         participants:
//           participantsToConnect.length > 0
//             ? { connect: participantsToConnect }
//             : undefined,
//       },
//     });

//     // Retorno os dados do projeto, mapeando resources como Prisma.JsonValue[]
//     return {
//       ...project,
//       id: project.id,
//       address: project.address as Prisma.JsonValue,
//       resources: project.resources as Prisma.JsonValue[], // Garantindo que resources seja um array de Prisma.JsonValue
//     };
//   }

//   // Método para buscar todos os projetos
//   async findAll(): Promise<ProjectEntity[]> {
//     const projects = await this.prismaService.project.findMany({
//       include: {
//         skillsRequired: {
//           include: {
//             skill: true, // Incluir a propriedade 'name' da skill
//           },
//         },
//         participants: {
//           include: {
//             user: true, // Incluindo dados do usuário participante
//           },
//         },
//         tasks: true,
//       },
//     });

//     // Mapeando a resposta para corrigir os tipos
//     return projects.map((project) => ({
//       ...project,
//       address: project.address as Prisma.JsonValue,
//       resources: project.resources as Prisma.JsonValue[], // Garantindo que seja um array de Prisma.JsonValue

//       // Ajustando os tipos de skillsRequired para corresponder a SkillEntity
//       skillsRequired: project.skillsRequired.map((skill) => ({
//         id: skill.id,
//         name: skill.skill.name, // Acessando o nome da skill no relacionamento
//       })),

//       // Ajustando a estrutura de participants para corresponder a ParticipantEntity
//       participants: project.participants.map((participant) => ({
//         id: participant.id,
//         userId: participant.userId, // Adicionando o userId
//         projectId: participant.projectId, // Adicionando o projectId
//         userName: participant.user.name,
//         userRole: participant.user.role,
//         user: {
//           id: participant.user.id,
//           name: participant.user.name,
//           email: participant.user.email,
//           phone: participant.user.phone,
//           totalHours: participant.user.totalHours,
//         },
//       })),

//       // Mapeando tasks, garantindo que todos os campos sejam compatíveis com TaskEntity
//       tasks: project.tasks.map((task) => ({
//         id: task.id,
//         description: task.description,
//         projectId: task.projectId,
//         name: task.name,
//         status: task.status,
//         assignedUid: task.assignedUid,
//         createdBy: task.createdBy,
//       })),
//     }));
//   }
// }
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

//   // Método para criar um novo projeto
//   async create(data: CreateProjectDto): Promise<ProjectEntity> {
//     const skillsToConnect = data.skillsRequired?.connect || [];
//     const tasksToConnect = data.tasks?.connect || [];
//     const participantsToConnect = data.participants?.connect || [];

//     // Garantir que a data e hora estão formatadas corretamente
//     const startDate = new Date(data.startDate).toISOString().split('T')[0]; // Apenas a data (YYYY-MM-DD)
//     const endDate = new Date(data.endDate).toISOString().split('T')[0]; // Apenas a data (YYYY-MM-DD)

//     const startTime = data.startTime; // Hora (HH:mm)
//     const endTime = data.endTime; // Hora (HH:mm)

//     const secondaryImages = Array.isArray(data.secondaryImages)
//       ? data.secondaryImages
//       : [data.secondaryImages]; // Garantir que seja um array

//     // Corrigir o campo resources para ser um array de strings ou um objeto JSON
//     const resources = Array.isArray(data.resources)
//       ? data.resources
//       : [data.resources]; // Agora é um array de strings ou objetos JSON

//     const project = await this.prismaService.project.create({
//       data: {
//         title: data.title,
//         area: data.area,
//         organization: data.organization,
//         organizationEmail: data.organizationEmail,
//         organizationPhone: data.organizationPhone,
//         startDate, // Apenas a data
//         endDate, // Apenas a data
//         startTime, // Hora de início
//         endTime, // Hora de término
//         totalSpots: data.totalSpots,
//         description: data.description,
//         mainImage: data.mainImage,
//         secondaryImages, // um array de strings
//         resources, // Passando o array de recursos para o banco de dados
//         skillsRequired:
//           skillsToConnect.length > 0 ? { connect: skillsToConnect } : undefined,
//         tasks:
//           tasksToConnect.length > 0 ? { connect: tasksToConnect } : undefined,
//         participants:
//           participantsToConnect.length > 0
//             ? { connect: participantsToConnect }
//             : undefined,
//       },
//     });

//     // Retorno os dados do projeto, mapeando resources como Prisma.JsonValue[]
//     return {
//       ...project,
//       id: project.id,
//       address: project.address as Prisma.JsonValue,
//       resources: project.resources as Prisma.JsonValue[], // Garantindo que resources seja um array de Prisma.JsonValue
//     };
//   }

//   // Método para buscar todos os projetos
//   async findAll(): Promise<ProjectEntity[]> {
//     const projects = await this.prismaService.project.findMany({
//       include: {
//         skillsRequired: {
//           include: {
//             skill: true, // Incluir a propriedade 'name' da skill
//           },
//         },
//         participants: {
//           include: {
//             user: true, // Incluindo dados do usuário participante
//           },
//         },
//         tasks: true,
//       },
//     });

//     // Mapeando a resposta para corrigir os tipos
//     return projects.map((project) => ({
//       ...project,
//       address: project.address as Prisma.JsonValue,
//       resources: project.resources as Prisma.JsonValue[], // Garantindo que seja um array de Prisma.JsonValue

//       // Ajustando os tipos de skillsRequired para corresponder a SkillEntity
//       skillsRequired: project.skillsRequired.map((skill) => ({
//         id: skill.id,
//         name: skill.skill.name, // Acessando o nome da skill no relacionamento
//       })),

//       // Ajustando a estrutura de participants para corresponder a ParticipantEntity
//       participants: project.participants.map((participant) => ({
//         id: participant.id,
//         userId: participant.userId, // Adicionando o userId
//         projectId: participant.projectId, // Adicionando o projectId
//         userName: participant.user.name,
//         userRole: participant.user.role,
//         user: {
//           id: participant.user.id,
//           name: participant.user.name,
//           email: participant.user.email,
//           phone: participant.user.phone,
//           totalHours: participant.user.totalHours,
//         },
//       })),

//       // Mapeando tasks, garantindo que todos os campos sejam compatíveis com TaskEntity
//       tasks: project.tasks.map((task) => ({
//         id: task.id,
//         description: task.description,
//         projectId: task.projectId,
//         name: task.name,
//         status: task.status,
//         assignedUid: task.assignedUid,
//         createdBy: task.createdBy,
//       })),
//     }));
//   }

//   // Método para adicionar habilidades a um projeto
//   async addSkillsToProject(
//     projectId: string,
//     skills: { id: string }[],
//   ): Promise<void> {
//     await this.prismaService.project.update({
//       where: { id: projectId },
//       data: {
//         skillsRequired: {
//           connect: skills, // Conecta as skills ao projeto
//         },
//       },
//     });
//   }
// }
// import { Injectable } from '@nestjs/common';
// import { CreateProjectDto } from 'src/domain/dtos/project/create-project.dto';
// import { PrismaService } from 'src/infra/database/prisma/prisma.service';

// @Injectable()
// export class ProjectRepository {
//   constructor(private readonly prismaService: PrismaService) {}

//   async create(data: CreateProjectDto) {
//     const project = await this.prismaService.project.create({
//       data: {
//         title: data.title,
//         description: data.description,
//         area: data.area,
//         organization: data.organization,
//         organizationEmail: data.organizationEmail,
//         organizationPhone: data.organizationPhone,
//         startDate: data.startDate,
//         endDate: data.endDate,
//         startTime: data.startTime,
//         endTime: data.endTime,
//         totalSpots: data.totalSpots,
//         mainImage: data.mainImage,
//         secondaryImages: data.secondaryImages,
//         resources: data.resources,
//         skillsRequired: {
//           // Se skillsRequired for passado como "create", cria novas habilidades
//           create: data.skillsRequired?.create?.map((skill) => ({
//             skill: { create: { name: skill.name } },
//           })),
//           // Se skillsRequired for passado como "connect", conecta as habilidades existentes
//           connect: data.skillsRequired?.connect?.map((skill) => ({
//             id: skill.id,
//           })),
//         },
//       },
//     });
//     return project;
//   }

//   async addSkillsToProject(projectId: string, skillIds: string[]) {
//     await this.prismaService.project.update({
//       where: { id: projectId },
//       data: {
//         skillsRequired: {
//           connect: skillIds.map((id) => ({ id })),
//         },
//       },
//     });
//   }
// }
// import { Injectable } from '@nestjs/common';
// import { CreateProjectDto } from 'src/domain/dtos/project/create-project.dto';
// import { PrismaService } from 'src/infra/database/prisma/prisma.service';

// @Injectable()
// export class ProjectRepository {
//   constructor(private prisma: PrismaService) {}

//   async create(data: CreateProjectDto) {
//     return this.prisma.project.create({
//       data: {
//         title: data.title,
//         area: data.area,
//         organization: data.organization,
//         organizationEmail: data.organizationEmail,
//         organizationPhone: data.organizationPhone,
//         startDate: data.startDate,
//         endDate: data.endDate,
//         startTime: data.startTime,
//         endTime: data.endTime,
//         totalSpots: data.totalSpots,
//         description: data.description,
//         mainImage: data.mainImage,
//         secondaryImages: data.secondaryImages,
//         resources: data.resources,
//         skillsRequired: {
//           connect: data.skills?.map((skillId) => ({ id: skillId })),
//         },
//         tasks: {
//           create: data.tasks?.map((task) => ({
//             name: task.name,
//             description: task.description,
//             status: task.status,
//           })),
//         },
//       },
//     });
//   }
import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from 'src/domain/dtos/project/create-project.dto';
import { PrismaService } from 'src/infra/database/prisma/prisma.service';

@Injectable()
export class ProjectRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateProjectDto) {
    const skillsToConnectOrCreate = [];

    // Verificar se as skills já existem ou criar novas
    for (const skillName of data.skillsRequired || []) {
      const existingSkill = await this.prisma.skill.findUnique({
        where: { name: skillName },
      });

      if (existingSkill) {
        // Se a skill existe, conecte-a usando o id
        skillsToConnectOrCreate.push({
          connect: { id: existingSkill.id },
        });
      } else {
        // Se a skill não existe, crie-a
        skillsToConnectOrCreate.push({
          create: { name: skillName },
        });
      }
    }

    return this.prisma.project.create({
      data: {
        title: data.title,
        area: data.area,
        organization: data.organization,
        organizationEmail: data.organizationEmail,
        organizationPhone: data.organizationPhone,
        startDate: data.startDate,
        endDate: data.endDate,
        startTime: data.startTime,
        endTime: data.endTime,
        totalSpots: data.totalSpots,
        description: data.description,
        mainImage: data.mainImage || '',
        secondaryImages: data.secondaryImages,
        resources: data.resources,
        skillsRequired: {
          // Agora estamos usando a lista corretamente com connect ou create
          connectOrCreate: skillsToConnectOrCreate,
        },
        tasks: {
          create:
            data.tasks?.map((task) => ({
              name: task.name,
              description: task.description,
              status: task.status,
            })) || [],
        },
      },
    });
  }
}
