// import { IsOptional, IsString } from 'class-validator';

// export class CreateTaskDto {
//   @IsString()
//   @IsOptional()
//   name?: string;

//   @IsString()
//   @IsOptional()
//   description?: string;

//   @IsString()
//   @IsOptional()
//   status?: string;

//   @IsString()
//   @IsOptional()
//   assignedUid?: string;

//   @IsString()
//   @IsOptional()
//   createdBy?: string;
// }
import { IsOptional, IsString } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  projectId: string;

  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsString()
  assignedUid?: string;
}
