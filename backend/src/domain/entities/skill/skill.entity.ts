export class SkillEntity {
  id: string;
  name: string;

  constructor(SkillEntityData: Partial<SkillEntity>) {
    Object.assign(this, SkillEntityData);
  }
}
