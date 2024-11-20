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

// import { Injectable, UnauthorizedException } from '@nestjs/common';
// import * as admin from 'firebase-admin'; // Firebase Admin SDK
// import { CreateUserDto } from 'src/domain/dtos';
// import { UserEntity } from 'src/domain/entities';
// import { UserRepository } from '../repositories/user.repository';

// @Injectable()
// export class UserService {
//   constructor(private readonly userRepository: UserRepository) {}

//   async create(dto: CreateUserDto, token: string): Promise<UserEntity> {
//     // Valida o token do Firebase
//     const decodedToken = await this.verifyFirebaseToken(token);

//     // Adiciona o UID do Firebase ao DTO
//     const userWithUid = {
//       ...dto,
//       firebaseUid: decodedToken.uid, // Extraído do token validado
//     };

//     // Salva o usuário no banco de dados
//     const user = await this.userRepository.create(userWithUid);

//     return user;
//   }

//   // Método para validar o token usando Firebase Admin SDK
//   private async verifyFirebaseToken(token: string) {
//     try {
//       return await admin.auth().verifyIdToken(token);
//     } catch (error) {
//       throw new UnauthorizedException('Token inválido ou não fornecido.');
//     }
//   }
// }
