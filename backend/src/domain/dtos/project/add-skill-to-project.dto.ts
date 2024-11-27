import { IsArray, IsString } from 'class-validator';

export class AddSkillToProjectDto {
  @IsArray()
  @IsString({ each: true })
  skillIds: string[]; // IDs das habilidades que serão associadas ao projeto
}
