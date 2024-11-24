import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from 'src/domain/dtos/task/create-task.dto';
import { TaskEntity } from 'src/domain/entities/task/task.entity';
import { TaskRepository } from '../repositories/task.repository';

@Injectable()
export class TaskService {
  constructor(private readonly taskRepository: TaskRepository) {}

  create(data: CreateTaskDto): Promise<TaskEntity> {
    return this.taskRepository.createTask(data);
  }

  findAll(): Promise<TaskEntity[]> {
    return this.taskRepository.findAllTasks();
  }
}
