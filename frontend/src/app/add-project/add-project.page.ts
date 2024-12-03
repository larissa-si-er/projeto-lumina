import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular'; // Importando o NavController para navegação
import { ProjectService } from '../services/project.service';
import { SkillService } from '../services/skills.service';
import { UploadService } from '../services/upload.service';

interface Project {
  title: string;
  area: string;
  organization: string;
  organizationEmail: string;
  organizationPhone: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  totalSpots: number;
  hoursValue: number;
  description: string;
  mainImage?: string | File; // Suporta URLs ou arquivos carregados
  secondaryImages: (string | File)[]; // Suporta URLs ou arquivos carregados
  resources: string[];
  tasks: { name: string; description: string }[];
  skillsRequired: string[];
  address: { city: string; state: string; country: string };
}

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.page.html',
  styleUrls: ['./add-project.page.scss'],
})
export class AddProjectPage implements OnInit {
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
  newResource: string = '';
  existingSkills: string[] = [];
  selectedSkill: string = '';

  // Variáveis para pré-visualização
  mainImagePreview: string | ArrayBuffer | null = null;
  secondaryImagesPreview: (string | ArrayBuffer | null)[] = [];

  constructor(
    private projectService: ProjectService,
    private skillService: SkillService,
    private uploadService: UploadService,
    private navController: NavController // Injeta o NavController para navegação
  ) {}

  ngOnInit() {
    this.loadExistingSkills();
  }

  loadExistingSkills() {
    this.skillService.getSkills().subscribe({
      next: (skills: any[]) => {
        this.existingSkills = skills.map((skill) => skill.name);
      },
      error: (err: any) => console.error('Erro ao carregar habilidades:', err),
    });
  }

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

  addResource() {
    if (this.newResource) {
      this.project.resources.push(this.newResource);
      this.newResource = '';
    }
  }

  removeResource(index: number) {
    this.project.resources.splice(index, 1);
  }

  async createProject() {
    try {
      const payload = {
        ...this.project,
        mainImage: this.project.mainImage || 'default_image_url',
        secondaryImages: this.project.secondaryImages || [],
        address: this.project.address || {
          city: 'Default City',
          state: 'Default State',
          country: 'Default Country',
        },
      };

      console.log('Enviando projeto ao backend:', payload);
      this.projectService.createProject(payload).subscribe({
        next: (response) => {
          console.log('Projeto criado com sucesso:', response);

          this.navController.navigateForward('/tabs');
        },
        error: (err) => console.error('Erro ao criar o projeto:', err),
      });
    } catch (error) {
      console.error('Erro inesperado ao criar o projeto:', error);
    }
  }

  addExistingSkill() {
    if (
      this.selectedSkill &&
      !this.project.skillsRequired.includes(this.selectedSkill)
    ) {
      this.project.skillsRequired.push(this.selectedSkill);
      this.selectedSkill = '';
    }
  }

  // Método para pré-visualizar imagens antes de enviar
  onMainImageSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.mainImagePreview = reader.result;
      };
      reader.readAsDataURL(file);

      // Enviar a imagem ao backend
      this.uploadService.uploadFiles([file]).subscribe({
        next: (response) => {
          this.project.mainImage = response.urls[0]; // Salva a URL retornada
        },
        error: (err) => console.error('Erro ao fazer upload da imagem:', err),
      });
    }
  }

  onSecondaryImagesSelected(event: any) {
    const files = Array.from(event.target.files) as File[];
    this.secondaryImagesPreview = []; // Limpa pré-visualizações anteriores

    // Enviar as imagens ao backend
    this.uploadService.uploadFiles(files).subscribe({
      next: (response) => {
        this.project.secondaryImages = response.urls; // Salva as URLs retornadas
      },
      error: (err) => console.error('Erro ao fazer upload das imagens:', err),
    });

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        this.secondaryImagesPreview.push(reader.result);
      };
      reader.readAsDataURL(file);
    });
  }
}
