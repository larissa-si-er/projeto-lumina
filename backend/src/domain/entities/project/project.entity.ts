import { Prisma } from '@prisma/client';

export class ProjectEntity {
  id: string;
  title: string;
  area: string;
  address?: Prisma.JsonValue; // Alinhado com o Prisma
  organization: string;
  organizationEmail: string;
  organizationPhone: string;
  startDate: Date;
  endDate?: Date;
  availableSpots?: number;
  totalSpots: number;
  description: string;
  hoursValue?: number;
  mainImage: string;
  secondaryImages: string[];
  resources: Prisma.JsonValue[]; // Recursos como array de JSON
  createdAt: Date;

  // Relacionamentos
  skillsRequired?: any[]; // Relacionamento inicial vazio
  participants?: any[];
  tasks?: any[];
}
