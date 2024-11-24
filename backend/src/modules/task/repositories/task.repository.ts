import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { RepositoryFactory } from 'src/common/factories';
import { CreateTaskDto } from 'src/domain/dtos/task/create-task.dto';
import { TaskEntity } from 'src/domain/entities/task/task.entity';

@Injectable()
export class TaskRepository extends RepositoryFactory<
  TaskEntity,
  CreateTaskDto,
  any
> {
  constructor() {
    super('task');
  }

  async createTask(data: CreateTaskDto): Promise<TaskEntity> {
    // Usando TaskUncheckedCreateInput para lidar com IDs diretamente
    const taskData: Prisma.TaskUncheckedCreateInput = {
      name: data.name || null,
      description: data.description || null,
      status: data.status || null,
      assignedUid: data.assignedUid || null, // ID do usuário responsável
      createdBy: data.createdBy || null, // ID do criador
      projectId: 'some-project-id', // Exemplo de ID de projeto
    };

    return this.prismaService.task.create({
      data: taskData,
    });
  }

  async findAllTasks(): Promise<TaskEntity[]> {
    return this.prismaService.task.findMany();
  }
}