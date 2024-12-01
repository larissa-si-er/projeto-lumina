import { forwardRef, Module } from '@nestjs/common';
import { SkillModule } from '../skill/skill.module'; // Importando SkillModule
import { TaskModule } from '../task/task.module'; // Importando TaskModule
import { UserModule } from '../user/user.module'; // Importando UserModule
import { ProjectController } from './controllers/project.controller';
import { ProjectRepository } from './repositories/project.repository';
import { ProjectService } from './services/project.service';

@Module({
  controllers: [ProjectController],
  providers: [ProjectService, ProjectRepository],
  imports: [forwardRef(() => SkillModule), TaskModule, UserModule], // Certificando-se de que UserModule está importado
  exports: [ProjectService],
})
export class ProjectModule {}
