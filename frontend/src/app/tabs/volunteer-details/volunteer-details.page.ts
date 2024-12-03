import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-volunteer-details',
  templateUrl: './volunteer-details.page.html',
  styleUrls: ['./volunteer-details.page.scss'],
})
export class VolunteerDetailsPage implements OnInit {
  project: any;
  isLoading = false;

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private location: Location,
    private loadingController: LoadingController
  ) {}

  ngOnInit() {
    const projectId = this.route.snapshot.paramMap.get('id');
    if (projectId) {
      this.loadProjectDetails(projectId);
    }
  }

  //  loader
  async loadProjectDetails(id: string) {
    const loader = await this.loadingController.create({
      message: 'Carregando...',
      duration: 1000,
    });
    await loader.present();

    this.projectService.getProjectById(id).subscribe(
      (data) => {
        this.project = data;
        loader.dismiss();
      },
      (error) => {
        console.error('Erro ao carregar os detalhes do projeto', error);
        loader.dismiss();
      }
    );
  }

  goBack() {
    this.location.back();
  }
}
