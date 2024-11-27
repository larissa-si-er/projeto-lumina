import { Prisma } from '@prisma/client';
import { ParticipantEntity } from 'src/domain/entities/participant/participant.entity';
import { SkillEntity } from 'src/domain/entities/skill/skill.entity';
import { TaskEntity } from 'src/domain/entities/task/task.entity';

export class ProjectEntity {
  id: string;
  title: string;
  area: string;
  address?: Prisma.JsonValue; // Ou outro tipo conforme a sua necessidade
  organization: string;
  organizationEmail: string;
  organizationPhone: string;
  startDate: string;
  endDate?: string;
  startTime?: string;
  endTime?: string;
  totalSpots: number;
  description: string;
  hoursValue?: number;
  mainImage: string;
  secondaryImages: string[];
  resources: Prisma.JsonValue[];
  skillsRequired?: SkillEntity[]; // Relacionamento com SkillEntity
  tasks?: TaskEntity[]; // Relacionamento com TaskEntity
  participants?: ParticipantEntity[]; // Relacionamento com ParticipantEntity
  createdAt: Date;
}
