import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/domain/dtos';
import { UserEntity } from 'src/domain/entities';
import { UserRepository } from '../repositories/user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(dto: CreateUserDto): Promise<UserEntity> {
    const userPayload = {
      ...dto,
      endereco: dto.endereco || null,
    };

    const user = await this.userRepository.create(userPayload);

    return user;
  }

  async getUserDetails(userId: string) {
    const user = await this.userRepository.findUnique(userId);
    return user;
  }

  async findById(userId: string): Promise<UserEntity | null> {
    return await this.userRepository.findUnique(userId);
  }
}
