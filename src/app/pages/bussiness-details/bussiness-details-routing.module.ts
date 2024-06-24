import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BussinessDetailsPage } from './bussiness-details.page';

const routes: Routes = [
  {
    path: '',
    component: BussinessDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BussinessDetailsPageRoutingModule {}
