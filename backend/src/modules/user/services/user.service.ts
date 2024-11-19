import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/domain/dtos';
import { UserEntity } from 'src/domain/entities';
import { UserRepository } from '../repositories/user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(dto: CreateUserDto): Promise<UserEntity> {
    //esta recebendo um dto do create e promete retornar user entity que armazena a resposta do metodo no user "coleçao/tabela de usuario"

    //todas as regras de negocio aqui (hash, verificação de email, numero...)

    const user = await this.userRepository.create(dto); //espera o userrepository criar no bd e ele vai retornar a promise que no caso é um userEntity

    return user;
  }
}

// import { Injectable } from '@nestjs/common';
// import { RepositoryFactory } from 'src/common/factories/repository/repository.factory';
// import { PrismaService } from 'src/infra/database/prisma/prisma.service';
// import { Prisma, User } from '@prisma/client';

// @Injectable()
// export class UserService {
//   private userRepository: RepositoryFactory<User>;

//   constructor(private readonly prismaService: PrismaService) {
//     this.userRepository = new RepositoryFactory<User>(prismaService, 'user');
//   }

//   async createUser(data: Prisma.UserCreateInput): Promise<User> {
//     return this.userRepository.create(data);
//   }
// }

// import { Injectable } from '@nestjs/common';
// import { PrismaService } from 'src/infra/database/prisma/prisma.service';

// @Injectable()
// export class UserService {
//   constructor(private readonly prismaService: PrismaService) {}

//   async createUser(data: any) {
//     return this.prismaService.user.create({ data });
//   }
// }

// import { Injectable } from '@nestjs/common';
// import { PrismaService } from 'src/infra/database/prisma/prisma.service';

// @Injectable()
// export class UserService {
//   constructor(private readonly prismaService: PrismaService) {
//     console.log(Object.keys(this.prismaService)); // Adicione esta linha
//   }

//   async createUser(data: any) {
//     return this.prismaService.user.create({ data });
//   }
// }
