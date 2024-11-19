import { Module } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { UserRepository } from './repositories/user.repository';
import { UserService } from './services/user.service';

@Module({
  controllers: [UserController],
  providers: [UserService, UserRepository], //precisa colocar o userrepository pro userservice entender que o repository ta com ele - so para os que estao dentro do mesmo modulo
  exports: [UserService],
})
export class UserModule {}
