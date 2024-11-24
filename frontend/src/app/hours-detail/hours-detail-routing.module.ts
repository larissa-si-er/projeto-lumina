import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HoursDetailPage } from './hours-detail.page';

const routes: Routes = [
  {
    path: '',
    component: HoursDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HoursDetailPageRoutingModule {}
