import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HoursDetailPageRoutingModule } from './hours-detail-routing.module';

import { HoursDetailPage } from './hours-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HoursDetailPageRoutingModule
  ],
  declarations: [HoursDetailPage]
})
export class HoursDetailPageModule {}
