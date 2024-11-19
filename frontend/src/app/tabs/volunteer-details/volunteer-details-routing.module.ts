import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VolunteerDetailsPage } from './volunteer-details.page';

const routes: Routes = [
  {
    path: '',
    component: VolunteerDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VolunteerDetailsPageRoutingModule {}
