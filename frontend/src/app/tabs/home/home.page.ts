import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { ProjectService } from '../../services/project.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  projects: any[] = [];
  userId: string = 'USER_ID_AQUI';
  selectedProjectId: string = '';

  constructor(
    private projectService: ProjectService,
    private userService: UserService,
    private toastController: ToastController,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.loadUserId();
    this.loadProjects();
  }

  loadUserId() {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      this.userId = storedUserId;
    } else {
      console.error('Usuário não autenticado!');
    }
  }

  loadProjects() {
    this.projectService.getProjects().subscribe({
      next: (response: any) => {
        this.projects = response;
      },
      error: (err: any) => {
        console.error('Erro ao carregar projetos:', err);
      },
    });
  }

  async presentToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      color: color, // 'success' para sucesso, 'danger' para erro
      position: 'top',
    });
    toast.present();
  }

  async presentConfirmationAlert(projectId: string) {
    const alert = await this.alertController.create({
      header: 'Confirmar Inscrição',
      message: 'Você tem certeza que deseja se inscrever neste projeto?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Usuário cancelou a inscrição');
          },
        },
        {
          text: 'Confirmar',
          handler: () => {
            this.participate(projectId); // Realiza a inscrição após confirmação
          },
        },
      ],
    });

    await alert.present();
  }

  participate(projectId: string) {
    this.projectService.subscribeToProject(projectId, this.userId).subscribe({
      next: () => {
        this.loadProjects(); // Atualiza os projetos
        this.presentToast('Inscrição realizada com sucesso!', 'success');
      },
      error: (err: any) => {
        this.presentToast(
          'Erro ao se inscrever: ' + err.error.message,
          'danger'
        );
      },
    });
  }
}
