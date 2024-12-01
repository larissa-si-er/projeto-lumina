import { Component } from '@angular/core';
import { ProjectService } from '../services/project.service';

interface Project {
  title: string;
  area: string;
  organization: string;
  organizationEmail: string;
  organizationPhone: string;
  startDate: string;
  endDate: string;
  startTime: '';
  endTime: '';
  totalSpots: number;
  hoursValue: 0;
  description: string;
  secondaryImages: [];
  resources: [];
  tasks: { name: string; description: string }[];
  skillsRequired: string[];
  mainImage?: string;
  address: { city: string; state: string; country: string };
}

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.page.html',
  styleUrls: ['./add-project.page.scss'],
})
export class AddProjectPage {
  project: Project = {
    title: '',
    area: '',
    organization: '',
    organizationEmail: '',
    organizationPhone: '',
    startDate: '',
    endDate: '',
    startTime: '',
    endTime: '',
    totalSpots: 0,
    hoursValue: 0,
    description: '',
    secondaryImages: [],
    resources: [],
    address: {
      city: '',
      state: '',
      country: '',
    },
    tasks: [],
    skillsRequired: [],
  };

  newSkill: string = '';
  newTask = { name: '', description: '' };

  constructor(private projectService: ProjectService) {}

  addTask() {
    if (this.newTask.name && this.newTask.description) {
      this.project.tasks.push({ ...this.newTask });
      this.newTask = { name: '', description: '' };
    }
  }

  removeTask(index: number) {
    this.project.tasks.splice(index, 1);
  }

  addSkill() {
    if (this.newSkill && !this.project.skillsRequired.includes(this.newSkill)) {
      this.project.skillsRequired.push(this.newSkill);
      this.newSkill = '';
    }
  }

  removeSkill(index: number) {
    this.project.skillsRequired.splice(index, 1);
  }

  async createProject() {
    try {
      const payload = {
        ...this.project,
        mainImage: this.project.mainImage || 'default_image_url',
        address: this.project.address || {
          city: 'Default City',
          state: 'Default State',
          country: 'Default Country',
        },
      };

      console.log('Enviando projeto ao backend:', payload);
      this.projectService.createProject(payload).subscribe({
        next: (response) =>
          console.log('Projeto criado com sucesso:', response),
        error: (err) => console.error('Erro ao criar o projeto:', err),
      });
    } catch (error) {
      console.error('Erro inesperado ao criar o projeto:', error);
    }
  }
}
