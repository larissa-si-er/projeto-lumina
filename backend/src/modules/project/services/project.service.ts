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
}
