// import { Module } from '@nestjs/common';
// import { ProjectController } from './controllers/project.controller';
// import { ProjectRepository } from './repositories/project.repository';
// import { ProjectService } from './services/project.service';

// @Module({
//   controllers: [ProjectController],
//   providers: [ProjectService, ProjectRepository],
//   exports: [ProjectService],
// })
// export class ProjectModule {}
import { Module } from '@nestjs/common';
import { SkillModule } from '../skill/skill.module'; // Importando SkillModule
import { TaskModule } from '../task/task.module'; // Importando TaskModule
import { UserModule } from '../user/user.module'; // Importando UserModule
import { ProjectController } from './controllers/project.controller';
import { ProjectRepository } from './repositories/project.repository';
import { ProjectService } from './services/project.service';

@Module({
  controllers: [ProjectController],
  providers: [ProjectService, ProjectRepository],
  imports: [SkillModule, TaskModule, UserModule], // Certificando-se de que UserModule está importado
  exports: [ProjectService],
})
export class ProjectModule {}
// import { Module } from '@nestjs/common';
// import { SkillRepository } from '../skill/repositories/skill.repository';
// import { TaskRepository } from '../task/repositories/task.repository'; // Verifique se TaskRepository está importado corretamente
// import { TaskModule } from '../task/task.module'; // Verifique se o TaskModule está importado corretamente
// import { ProjectRepository } from './repositories/project.repository';
// import { ProjectService } from './services/project.service';

// @Module({
//   imports: [TaskModule], // Importando o módulo que contém o TaskRepository
//   providers: [
//     ProjectService,
//     ProjectRepository,
//     SkillRepository,
//     TaskRepository, // Certifique-se de que TaskRepository está incluído aqui
//   ],
// })
// export class ProjectModule {}
