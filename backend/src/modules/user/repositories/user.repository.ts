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

  //ALTERAÇOES
  async findByEmail(email: string): Promise<UserEntity | null> {
    return this.prismaService.user.findUnique({
      where: {
        email, // Aqui o prisma reconhece o email como um campo único
      },
    });
  }
}
