import { forwardRef, Module } from '@nestjs/common';
import e from 'express';
import { ProjectModule } from 'src/modules/project/project.module';
import { SkillController } from './controllers/skill.controller';
import { SkillRepository } from './repositories/skill.repository';
import { SkillService } from './services/skill.service';

@Module({
  controllers: [SkillController],
  providers: [SkillService, SkillRepository],
  imports: [forwardRef(() => ProjectModule)],
  exports: [SkillService, SkillRepository],
})
export class SkillModule {}
