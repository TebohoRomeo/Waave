import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SuccessDonationPage } from './success-donation.page';

const routes: Routes = [
  {
    path: '',
    component: SuccessDonationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SuccessDonationPageRoutingModule {}
