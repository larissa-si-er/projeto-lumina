// import { CommonModule } from '@angular/common';
// import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
// import { FormsModule } from '@angular/forms';

// import { IonicModule } from '@ionic/angular';

// import { ProjectPageRoutingModule } from './project-routing.module';

// import { ProjectPage } from './project.page';

// @NgModule({
//   imports: [CommonModule, FormsModule, IonicModule, ProjectPageRoutingModule],
//   declarations: [ProjectPage],
//   schemas: [CUSTOM_ELEMENTS_SCHEMA],
// })
// export class ProjectPageModule {}
import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ProjectPageRoutingModule } from './project-routing.module';
import { ProjectPage } from './project.page';

// Importação do SwiperJS
// import { SwiperModule } from 'swiper/angular';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProjectPageRoutingModule,
    //SwiperModule  Adicionado SwiperModule
  ],
  declarations: [ProjectPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA], // Permite componentes personalizados como Swiper
})
export class ProjectPageModule {}
