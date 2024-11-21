// import { Injectable } from '@nestjs/common';
// import { CreateUserDto } from 'src/domain/dtos';
// import { UserEntity } from 'src/domain/entities';
// import { UserRepository } from '../repositories/user.repository';

// @Injectable()
// export class UserService {
//   constructor(private readonly userRepository: UserRepository) {}

//   async create(dto: CreateUserDto): Promise<UserEntity> {
//     //esta recebendo um dto do create e promete retornar user entity que armazena a resposta do metodo no user "coleçao/tabela de usuario"

//     //todas as regras de negocio aqui (hash, verificação de email, numero...)

//     const user = await this.userRepository.create(dto); //espera o userrepository criar no bd e ele vai retornar a promise que no caso é um userEntity

//     return user;
//   }
// }
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/domain/dtos';
import { UserEntity } from 'src/domain/entities';
import { UserRepository } from '../repositories/user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(dto: CreateUserDto): Promise<UserEntity> {
    // Se 'endereco' foi passado, armazena como objeto JSON
    const userPayload = {
      ...dto,
      endereco: dto.endereco || null, // 'null' caso não tenha sido enviado
    };

    // Use userPayload em vez de dto diretamente
    const user = await this.userRepository.create(userPayload); // Agora estamos passando userPayload, não dto

    return user;
  }
}
