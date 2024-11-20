import { $Enums } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: String;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  endereco: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsNumber()
  @IsNotEmpty()
  totalHours: number;

  @IsEnum($Enums.userRole)
  @IsNotEmpty()
  role: string;

  // Novo campo para o token do Firebase
  // @IsString()
  // @IsNotEmpty()
  // token: string; // Token recebido do Firebase para validação

  // // Novo campo opcional para armazenar o UID do Firebase
  // @IsString()
  // // // @IsOptional()
  // firebaseUid?: string;
}
