import { Type } from 'class-transformer';
import {
  IsArray,
  IsDecimal,
  IsInt,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateProjectDto {
  @IsString()
  title: string;

  @IsString()
  area: string;

  @IsString()
  organization: string;

  @IsString()
  organizationEmail: string;

  @IsString()
  organizationPhone: string;

  @IsOptional() //
  address?: {
    city: string;
    state: string;
    country: string;
  };

  @IsString()
  startDate: string;

  @IsOptional()
  @IsString()
  endDate?: string;

  @IsOptional()
  @IsString()
  startTime?: string;

  @IsOptional()
  @IsString()
  endTime?: string;

  @IsOptional()
  @IsInt()
  totalSpots?: number;

  @IsOptional()
  @IsInt()
  availableSpots?: number;

  @IsOptional()
  @IsDecimal()
  hoursValue?: number;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  mainImage?: string;

  @IsOptional()
  @IsArray()
  @Type(() => String)
  secondaryImages?: string[] | string;

  @IsOptional()
  @IsArray()
  @Type(() => String)
  resources?: string[] | string;

  @IsOptional()
  @IsArray()
  skillsRequired?: string[];

  @IsOptional()
  @IsArray()
  tasks?: { name: string; description?: string; status?: string }[];
}
