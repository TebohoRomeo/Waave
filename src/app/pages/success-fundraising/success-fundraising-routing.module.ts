import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SuccessFundraisingPage } from './success-fundraising.page';

const routes: Routes = [
  {
    path: '',
    component: SuccessFundraisingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SuccessFundraisingPageRoutingModule {}
