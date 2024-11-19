import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VolunteerDetailsPageRoutingModule } from './volunteer-details-routing.module';

import { VolunteerDetailsPage } from './volunteer-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VolunteerDetailsPageRoutingModule
  ],
  declarations: [VolunteerDetailsPage]
})
export class VolunteerDetailsPageModule {}
