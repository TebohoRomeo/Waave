import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdatesDetailsPage } from './updates-details.page';

const routes: Routes = [
  {
    path: '',
    component: UpdatesDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdatesDetailsPageRoutingModule {}
