import { Module } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { UserRepository } from './repositories/user.repository';
import { UserService } from './services/user.service';

//teste notificaçao:
import { FirebaseAdminModule } from 'src/infra/services/firebase-admin.module';

@Module({
  controllers: [UserController],
  providers: [UserService, UserRepository], //precisa colocar o userrepository pro userservice entender que o repository ta com ele - so para os que estao dentro do mesmo modulo
  exports: [UserService],

  //teste notificaçoes:
  imports: [FirebaseAdminModule],
})
export class UserModule {}

// {
//   "name": "Jane Doe",
//   "phone": "987654321",
//   "password": "minhaSenha123",
//   "endereco": "Rua Exemplo, 45",
//   "email": "janedoe@example.com",
//   "totalHours": 20,
//   "role": "admin"
// }
