// import { Body, Controller, Post } from '@nestjs/common';
// import { CreateUserDto } from 'src/domain/dtos';
// import { UserEntity } from 'src/domain/entities';
// import { UserService } from '../services/user.service';

// @Controller('user')
// export class UserController {
//   constructor(private readonly userService: UserService) {}

//   @Post()
//   createUser(@Body() createUserDto: CreateUserDto): Promise<UserEntity> {
//     return this.userService.create(createUserDto);
//   }
// }

//testeando notificação::::::
import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { CreateUserDto } from 'src/domain/dtos';
import { UserEntity } from 'src/domain/entities';
import { FirebaseAdminService } from 'src/infra/services/firebase-admin.service'; // Importa o serviço de notificações
import { UserService } from '../services/user.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly firebaseAdminService: FirebaseAdminService, // Injeta o serviço de notificações
  ) {}

  @Post()
  createUser(@Body() createUserDto: CreateUserDto): Promise<UserEntity> {
    return this.userService.create(createUserDto);
  }

  // Novo endpoint para enviar notificações
  @Post('send-notification')
  async sendNotification(
    @Body() body: { token: string; title: string; message: string },
  ): Promise<void> {
    const { token, title, message } = body;
    return this.firebaseAdminService.sendPushNotification(
      token,
      title,
      message,
    );
  }

  @Get(':userId')
  async getUser(@Param('userId') userId: string) {
    const user = await this.userService.findById(userId);
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }
    return user;
  }
}
