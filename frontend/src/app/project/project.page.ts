// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-project',
//   templateUrl: './project.page.html',
//   styleUrls: ['./project.page.scss'],
// })
// export class ProjectPage {
//   selectedSegment: string = 'principal';

//   segmentChanged(event: any) {
//     this.selectedSegment = event.detail.value;
//   }
// }
import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-project',
  templateUrl: './project.page.html',
  styleUrls: ['./project.page.scss'],
})
export class ProjectPage implements AfterViewInit, OnDestroy {
  selectedSegment: string = 'principal';
  chart: Chart<'doughnut', number[], string> | null = null; // Definição explícita do tipo

  tasksAFazer = [
    {
      title: 'Tarefa 1',
      date: '12/07',
      responsible: null,
      statusColor: 'danger',
    },
    {
      title: 'Tarefa 2',
      date: '12/07',
      responsible: 'V',
      statusColor: 'danger',
    },
  ];

  tasksInProgress = [
    {
      title: 'Tarefa 3',
      date: '12/07',
      responsible: null,
      statusColor: 'primary',
    },
  ];

  tasksCompleted = [
    {
      title: 'Tarefa 4',
      date: '12/07',
      responsible: null,
      statusColor: 'success',
    },
  ];

  constructor(private alertController: AlertController) {}

  async showPhoneNumber() {
    const alert = await this.alertController.create({
      header: 'Contato Telefônico',
      message: 'Número de telefone: (99) 99999-9999',
      buttons: ['OK'],
    });
    await alert.present();
  }

  async showEmail() {
    const alert = await this.alertController.create({
      header: 'Contato por Email',
      message: 'Endereço de email: exemplo@email.com',
      buttons: ['OK'],
    });
    await alert.present();
  }

  segmentChanged(event: any) {
    this.selectedSegment = event.detail.value;

    // Reinicializar o gráfico ao retornar ao segmento principal
    if (this.selectedSegment === 'principal') {
      setTimeout(() => {
        this.initializeChart();
      }, 0);
    }
  }

  addResponsible(task: any) {
    if (!task.responsible) {
      console.log('Adicionar responsável para:', task.title);
      task.responsible = '+';
    }
  }

  editTask(task: any) {
    console.log('Editar tarefa:', task.title);
  }

  ngAfterViewInit() {
    this.initializeChart();
  }

  ngOnDestroy() {
    // Destruir a instância do gráfico ao sair da página
    this.destroyChart();
  }

  initializeChart() {
    const totalTasks =
      this.tasksAFazer.length +
      this.tasksInProgress.length +
      this.tasksCompleted.length;
    const completedTasks = this.tasksCompleted.length;
    const remainingTasks = totalTasks - completedTasks;

    const ctx = document.getElementById('progressChart') as HTMLCanvasElement;

    // Verificar se o gráfico já existe e destruí-lo antes de recriar
    if (this.chart) {
      this.chart.destroy();
    }

    this.chart = new Chart<'doughnut', number[], string>(ctx, {
      type: 'doughnut', // Tipo de gráfico circular
      data: {
        labels: ['Concluídas', 'Pendentes'], // Legendas
        datasets: [
          {
            label: 'Progresso',
            data: [completedTasks, remainingTasks], // Quantidade de tarefas feitas e não feitas
            backgroundColor: ['#b9007b', '#d3d3d3'], // Cores
            hoverBackgroundColor: ['#b9007b', '#d3d3d3'],
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true,
            position: 'bottom',
          },
        },
      },
    });
  }

  destroyChart() {
    if (this.chart) {
      this.chart.destroy();
      this.chart = null;
    }
  }
}
