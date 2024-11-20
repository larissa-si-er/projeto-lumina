import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/domain/dtos';
import { UserEntity } from 'src/domain/entities';
import { UserService } from '../services/user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  createUser(@Body() createUserDto: CreateUserDto): Promise<UserEntity> {
    return this.userService.create(createUserDto);
  }
}

// import { Body, Controller, Post, Headers } from '@nestjs/common';
// import { CreateUserDto } from 'src/domain/dtos';
// import { UserEntity } from 'src/domain/entities';
// import { UserService } from '../services/user.service';

// @Controller('user')
// export class UserController {
//   constructor(private readonly userService: UserService) {}

//   @Post()
//   async createUser(
//     @Body() createUserDto: CreateUserDto,
//     @Headers('Authorization') authHeader: string, // Token JWT vem no cabeçalho
//   ): Promise<UserEntity> {
//     if (!authHeader) {
//       throw new Error('Authorization header is missing');
//     }

//     const token = authHeader.split(' ')[1]; // Remove o "Bearer" do token

//     return this.userService.create(createUserDto, token);
//   }
// }
