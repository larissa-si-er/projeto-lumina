import { Module } from '@nestjs/common';
import { SkillController } from './controllers/skill.controller';
import { SkillRepository } from './repositories/skill.repository';
import { SkillService } from './services/skill.service';

@Module({
  controllers: [SkillController],
  providers: [SkillService, SkillRepository],
  exports: [SkillService],
})
export class SkillModule {}
