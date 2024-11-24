import { IsOptional, IsString } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  status?: string;

  @IsString()
  @IsOptional()
  assignedUid?: string;

  @IsString()
  @IsOptional()
  createdBy?: string;
}
