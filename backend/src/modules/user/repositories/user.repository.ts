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

  // Criação de usuário com o Firebase UID
  // async createWithFirebase(
  //   dto: CreateUserDto & { firebaseUid: string },
  // ): Promise<UserEntity> {
  //   return this.create({
  //     ...dto,
  //     firebaseUid: dto.firebaseUid,
  //   });
  // }

  // // Buscar por firebaseUid
  // async findByFirebaseUid(firebaseUid: string): Promise<UserEntity | null> {
  //   return this.prismaService.user.findUnique({
  //     where: { firebaseUid },
  //   });
  // }
}
