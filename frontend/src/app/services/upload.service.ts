import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UploadService {
  private baseUrl = 'http://localhost:3000/projects';

  constructor(private http: HttpClient) {}

  uploadFiles(files: File[]) {
    const formData = new FormData();
    files.forEach((file) => formData.append('files', file));

    return this.http.post<{ urls: string[] }>(
      `${this.baseUrl}/upload`,
      formData
    );
  }
}
