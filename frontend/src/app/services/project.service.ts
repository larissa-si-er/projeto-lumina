import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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

  uploadImages(formData: FormData) {
    return this.http.post<string[]>(
      'http://localhost:3000/projects/upload',
      formData
    );
  }

  getProjects(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getProjectById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
}
