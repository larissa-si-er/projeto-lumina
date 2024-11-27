import { IsArray, IsInt, IsOptional, IsString } from 'class-validator';

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
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  mainImage?: string;

  @IsOptional()
  @IsArray()
  secondaryImages?: string[];

  @IsOptional()
  @IsArray()
  resources?: any[];

  @IsOptional()
  @IsArray()
  skillsRequired?: string[];

  @IsOptional()
  @IsArray()
  tasks?: { name: string; description?: string; status?: string }[];

  @IsOptional() //
  address?: {
    city: string;
    state: string;
    country: string;
  };
}
