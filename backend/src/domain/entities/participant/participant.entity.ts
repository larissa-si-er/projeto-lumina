// src/domain/entities/participant.entity.ts
import { Prisma } from '@prisma/client';

export class ParticipantEntity {
  id: string; // ID do relacionamento (ProjectParticipant)
  userId: string;
  projectId: string;
  userName: string; // Nome do usuário (usado para exibir no frontend)
  userRole: string;
}
