// import { Module } from '@nestjs/common';
// import { PrismaModule } from './infra/database/prisma/prisma.module';
// import { UserModule } from './modules/user/user.module';

// @Module({
//   imports: [UserModule, PrismaModule], //AQUI TEM QUE IMPORTAR TODOS OS MODULOS PQ ESSE É O PRINCIPAL
// })
// export class AppModule {}
import { Module } from '@nestjs/common';
import { PrismaModule } from './infra/database/prisma/prisma.module';
import { FirebaseAdminModule } from './infra/services/firebase-admin.module'; // Importa o novo módulo
import { ProjectModule } from './modules/project/project.module';
import { SkillModule } from './modules/skill/skill.module';
import { TaskModule } from './modules/task/task.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    UserModule,
    PrismaModule,
    FirebaseAdminModule,
    ProjectModule,
    TaskModule,
    SkillModule,
  ], //ate o firebaseadmin, depois é alteraçao
})
export class AppModule {}
