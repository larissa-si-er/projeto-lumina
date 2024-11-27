import { Body, Controller, Post } from '@nestjs/common';
import { CreateTaskDto } from 'src/domain/dtos/task/create-task.dto';
import { TaskService } from '../services/task.service';

@Controller('tasks')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Post()
  async create(@Body() createTaskDto: CreateTaskDto) {
    return this.taskService.create(createTaskDto);
  }
}
