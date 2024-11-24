import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateTaskDto } from 'src/domain/dtos/task/create-task.dto';
import { TaskEntity } from 'src/domain/entities/task/task.entity';
import { TaskService } from '../services/task.service';

@Controller('tasks') // Prefixo para as rotas
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  async create(@Body() createTaskDto: CreateTaskDto): Promise<TaskEntity> {
    return this.taskService.create(createTaskDto);
  }

  @Get()
  async findAll(): Promise<TaskEntity[]> {
    return this.taskService.findAll();
  }
}
