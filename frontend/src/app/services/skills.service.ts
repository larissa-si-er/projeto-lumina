// skills.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SkillsService {
  private baseUrl = 'http://localhost:3000/skills';

  constructor(private http: HttpClient) {}

  getSkills() {
    return this.http.get<any[]>(this.baseUrl);
  }

  createSkill(skillData: any) {
    // Tipando como `any`
    return this.http.post(this.baseUrl, skillData);
  }
}
