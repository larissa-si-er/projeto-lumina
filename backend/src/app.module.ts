import { Module } from '@nestjs/common';
import { PrismaModule } from './infra/database/prisma/prisma.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [UserModule, PrismaModule], //AQUI TEM QUE IMPORTAR TODOS OS MODULOS PQ ESSE É O PRINCIPAL
})
export class AppModule {}
