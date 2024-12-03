import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  projects: any[] = []; // Array para armazenar os projetos

  constructor(private projectService: ProjectService) {}

  ngOnInit() {
    this.loadProjects();
  }

  loadProjects() {
    // Chama o serviço que vai buscar os projetos no backend
    this.projectService.getProjects().subscribe({
      next: (response: any) => {
        this.projects = response; // Atribui os projetos à variável `projects`
      },
      error: (err: any) => {
        console.error('Erro ao carregar projetos:', err);
      },
    });
  }
}
