import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ResourceDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  quantity: number;
}
