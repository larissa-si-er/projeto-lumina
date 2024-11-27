// import { Injectable } from '@nestjs/common';
// import { CreateSkillDto } from 'src/domain/dtos/skill/create-skill.dto';
// import { SkillEntity } from 'src/domain/entities/skill/skill.entity';
// import { SkillRepository } from '../repositories/skill.repository';

// @Injectable()
// export class SkillService {
//   constructor(private readonly skillRepository: SkillRepository) {}

//   create(data: CreateSkillDto): Promise<SkillEntity> {
//     return this.skillRepository.createSkill(data);
//   }

//   findAll(): Promise<SkillEntity[]> {
//     return this.skillRepository.findAllSkills();
//   }
// }
// src/modules/skill/services/skill.service.ts
import { Injectable } from '@nestjs/common';
import { CreateSkillDto } from 'src/domain/dtos/skill/create-skill.dto';
import { SkillRepository } from '../repositories/skill.repository';

@Injectable()
export class SkillService {
  constructor(private readonly skillRepository: SkillRepository) {}

  /**
   * Cria uma ou várias Skills.
   * @param dtos Um ou mais objetos CreateSkillDto.
   */
  async createSkills(dtos: CreateSkillDto | CreateSkillDto[]) {
    // Garantir que 'dtos' é tratado como um array
    const dtosArray = Array.isArray(dtos) ? dtos : [dtos];

    // Processa cada DTO no array
    const createdSkills = await Promise.all(
      dtosArray.map((dto) => {
        // Cria cada skill com o dto
        return this.skillRepository.create(dto);
      }),
    );

    // Retorna as skills criadas
    return createdSkills;
  }
}
