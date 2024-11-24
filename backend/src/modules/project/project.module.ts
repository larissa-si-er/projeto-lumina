import { Module } from '@nestjs/common';
import { ProjectController } from './controllers/project.controller';
import { ProjectRepository } from './repositories/project.repository';
import { ProjectService } from './services/project.service';

@Module({
  controllers: [ProjectController],
  providers: [ProjectService, ProjectRepository],
  exports: [ProjectService],
})
export class ProjectModule {}
