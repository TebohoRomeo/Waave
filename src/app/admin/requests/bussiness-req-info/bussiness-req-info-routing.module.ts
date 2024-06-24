import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BussinessReqInfoPage } from './bussiness-req-info.page';

const routes: Routes = [
  {
    path: '',
    component: BussinessReqInfoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BussinessReqInfoPageRoutingModule {}
