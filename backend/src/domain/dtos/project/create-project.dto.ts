import {
  IsArray,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateProjectDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  area: string;

  @IsObject()
  @IsOptional()
  address?: Record<string, any>;

  @IsString()
  @IsNotEmpty()
  organization: string;

  @IsString()
  @IsNotEmpty()
  organizationEmail: string;

  @IsString()
  @IsNotEmpty()
  organizationPhone: string;

  @IsDateString()
  @IsNotEmpty()
  startDate: Date;

  @IsDateString()
  @IsOptional()
  endDate?: Date;

  @IsNumber()
  @IsNotEmpty()
  totalSpots: number;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @IsOptional()
  hoursValue?: number;

  @IsString()
  @IsNotEmpty()
  mainImage: string;

  @IsArray()
  @IsOptional()
  secondaryImages: string[];

  @IsArray()
  @IsOptional()
  resources?: Record<string, any>[];

  @IsArray()
  @IsOptional()
  skillsRequired?: string[]; // IDs de habilidades

  @IsArray()
  @IsOptional()
  tasks?: string[]; // IDs de tarefas

  // Adicionado: participants
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  participants?: string[];
}
