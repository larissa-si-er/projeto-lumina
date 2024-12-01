import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from 'src/domain/dtos/project/create-project.dto';
import { PrismaService } from 'src/infra/database/prisma/prisma.service';

@Injectable()
export class ProjectRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateProjectDto) {
    const skillsToConnectOrCreate = [];

    const normalizedSecondaryImages = Array.isArray(data.secondaryImages)
      ? data.secondaryImages
      : [data.secondaryImages].filter((img) => img);

    const normalizedResources = Array.isArray(data.resources)
      ? data.resources
      : [data.resources].filter((resource) => resource);

    for (const skillName of data.skillsRequired || []) {
      const existingSkill = await this.prisma.skill.findUnique({
        where: { name: skillName },
      });

      if (existingSkill) {
        // skill existe
        skillsToConnectOrCreate.push({
          connect: { id: existingSkill.id },
        });
      } else {
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
        hoursValue: data.hoursValue,
        description: data.description,
        mainImage: data.mainImage || 'default_image_url',
        secondaryImages: normalizedSecondaryImages,
        resources: normalizedResources,
        skillsRequired: {
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
