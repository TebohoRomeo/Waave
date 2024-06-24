import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BussinessRequestsPage } from './bussiness-requests.page';

const routes: Routes = [
  {
    path: '',
    component: BussinessRequestsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BussinessRequestsPageRoutingModule {}
