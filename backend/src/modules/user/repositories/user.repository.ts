import { Injectable } from '@nestjs/common';
import { RepositoryFactory } from 'src/common/factories';
import { CreateUserDto, UpdateUserDto } from 'src/domain/dtos';
import { UserEntity } from 'src/domain/entities';

@Injectable()
export class UserRepository extends RepositoryFactory<
  UserEntity,
  CreateUserDto,
  UpdateUserDto
> {
  constructor() {
    super('user');
  }

  //   findAll(): Promise<UserEntity[]> {
  //     return this.prismaService.user.findMany();
  //   }

  //   findById(id: string): Promise<UserEntity> {
  //     return this.prismaService.user.findUnique({
  //       where: {
  //         id: id,
  //       },
  //     });
  //   }
}

// import { Injectable } from '@nestjs/common';
// import { RepositoryFactory } from 'src/common/factories/repository/repository.factory';
// import { UserEntity } from 'src/domain/entities';
// import { PrismaService } from 'src/infra/database/prisma/prisma.service';

// @Injectable()
// export class UserRepository extends RepositoryFactory<UserEntity> {
//   constructor(prismaService: PrismaService) {
//     super(prismaService, 'user');
//   }
// }
