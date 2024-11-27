import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private apiUrl = 'http://localhost:3000/projects';

  constructor(private http: HttpClient) {}

  createProject(project: any) {
    return this.http.post(`${this.apiUrl}`, project);
  }

  getSkills() {
    return this.http.get('http://localhost:3000/skills');
  }

  addTask(task: any) {
    return this.http.post(`http://localhost:3000/tasks`, task);
  }

  addSkillsToProject(payload: any) {
    return this.http.post(`${this.apiUrl}/skills`, payload);
  }
}
