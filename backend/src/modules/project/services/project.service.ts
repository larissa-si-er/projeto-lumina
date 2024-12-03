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

    const normalizedCreateProjectDto = {
      ...createProjectDto,
      secondaryImages: Array.isArray(createProjectDto.secondaryImages)
        ? createProjectDto.secondaryImages
        : [createProjectDto.secondaryImages].filter((img) => img),
      resources: Array.isArray(createProjectDto.resources)
        ? createProjectDto.resources
        : [createProjectDto.resources].filter((res) => res),
      tasks: Array.isArray(createProjectDto.tasks)
        ? createProjectDto.tasks
        : [createProjectDto.tasks].filter((task) => task),
      skillsRequired: Array.isArray(createProjectDto.skillsRequired)
        ? createProjectDto.skillsRequired
        : [createProjectDto.skillsRequired].filter((skill) => skill),
    };

    const formattedStartDate = new Date(normalizedCreateProjectDto.startDate)
      .toISOString()
      .split('T')[0]; // Formato YYYY-MM-DD
    const formattedEndDate = normalizedCreateProjectDto.endDate
      ? new Date(normalizedCreateProjectDto.endDate).toISOString().split('T')[0] // Formato YYYY-MM-DD
      : null;

    // Aquii tribui as datas formatadas ao DTO
    normalizedCreateProjectDto.startDate = formattedStartDate;
    normalizedCreateProjectDto.endDate = formattedEndDate;

    const availableSpots = normalizedCreateProjectDto.totalSpots;

    try {
      const createdProject = await this.prisma.project.create({
        data: {
          title: normalizedCreateProjectDto.title,
          area: normalizedCreateProjectDto.area,
          organization: normalizedCreateProjectDto.organization,
          organizationEmail: normalizedCreateProjectDto.organizationEmail,
          organizationPhone: normalizedCreateProjectDto.organizationPhone,
          startDate: normalizedCreateProjectDto.startDate,
          endDate: normalizedCreateProjectDto.endDate,
          startTime: normalizedCreateProjectDto.startTime,
          endTime: normalizedCreateProjectDto.endTime,
          totalSpots: normalizedCreateProjectDto.totalSpots,
          hoursValue: normalizedCreateProjectDto.hoursValue,
          availableSpots,
          description: normalizedCreateProjectDto.description,
          mainImage:
            normalizedCreateProjectDto.mainImage || 'default_image_url',
          secondaryImages: normalizedCreateProjectDto.secondaryImages,
          resources: normalizedCreateProjectDto.resources,
          address: normalizedCreateProjectDto.address || null,
          tasks: {
            create: normalizedCreateProjectDto.tasks || [],
          },
          skillsRequired: {
            create:
              normalizedCreateProjectDto.skillsRequired?.map((name) => ({
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

      const formattedSkills = createdProject.skillsRequired.map(
        (skillRelation) => ({
          id: skillRelation.skill.id,
          name: skillRelation.skill.name,
        }),
      );

      return {
        ...createdProject,
        skillsRequired: formattedSkills,
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

  async assignSkillsToProject(projectId: string, skills: string[]) {
    const project = await this.prisma.project.findUnique({
      where: { id: projectId },
      include: { skillsRequired: true },
    });

    if (!project) {
      throw new Error('Projeto não encontrado');
    }

    // habilidades - projeto
    const skillsToAssign = await this.prisma.skill.findMany({
      where: {
        name: { in: skills },
      },
    });

    if (skillsToAssign.length === 0) {
      throw new Error('Nenhuma habilidade encontrada');
    }

    await this.prisma.project.update({
      where: { id: projectId },
      data: {
        skillsRequired: {
          connect: skillsToAssign.map((skill) => ({ id: skill.id })),
        },
      },
    });

    return { message: 'Habilidades associadas com sucesso ao projeto' };
  }

  addSkillsToProject(projectId: string, skills: string[]) {
    console.log(
      `Associando as habilidades ${skills.join(', ')} ao projeto ${projectId}`,
    );
    return { projectId, skills };
  }

  //buscar projetos
  async getAllProjects(): Promise<ProjectEntity[]> {
    const projects = await this.prisma.project.findMany();

    return projects.map((project) => ({
      ...project,
      mainImage: typeof project.mainImage === 'string' ? project.mainImage : '',
    }));
  }

  async getProjectById(id: string): Promise<ProjectEntity> {
    const project = await this.prisma.project.findUnique({
      where: { id },
      include: { tasks: true, skillsRequired: { include: { skill: true } } },
    });

    if (!project) {
      throw new Error('Projeto não encontrado');
    }

    const formattedSkills = project.skillsRequired.map((skillRelation) => ({
      id: skillRelation.skill.id,
      name: skillRelation.skill.name, // Isso garante que o nome está presente
    }));

    return {
      ...project,
      skillsRequired: formattedSkills,
    };
  }

  async checkParticipant(projectId: string, userId: string) {
    return this.prisma.projectParticipant.findFirst({
      where: { projectId, userId },
    });
  }

  async addParticipant(projectId: string, userId: string) {
    // Buscar o projeto e suas horas
    const project = await this.prisma.project.findUnique({
      where: { id: projectId },
    });

    if (!project) {
      throw new Error('Projeto não encontrado');
    }

    // Buscar o usuário
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    // Verificar se o usuário já está inscrito no projeto
    const existingParticipation =
      await this.prisma.projectParticipant.findFirst({
        where: { projectId, userId },
      });

    if (existingParticipation) {
      throw new Error('Usuário já está inscrito neste projeto');
    }

    // Adicionar o usuário ao projeto
    await this.prisma.projectParticipant.create({
      data: { projectId, userId },
    });

    // Acumular as horas do projeto no totalHours do usuário
    await this.prisma.user.update({
      where: { id: userId },
      data: {
        totalHours: user.totalHours + project.hoursValue, // Somar as horas do projeto
      },
    });

    // Atualizar a quantidade de vagas disponíveis
    await this.prisma.project.update({
      where: { id: projectId },
      data: { availableSpots: { decrement: 1 } },
    });

    return { message: 'Usuário inscrito com sucesso e horas acumuladas' };
  }
}
