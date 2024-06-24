import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FundraiserReqInfoPage } from './fundraiser-req-info.page';

const routes: Routes = [
  {
    path: '',
    component: FundraiserReqInfoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FundraiserReqInfoPageRoutingModule {}
