import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SuccessbussinessPage } from './successbussiness.page';

const routes: Routes = [
  {
    path: '',
    component: SuccessbussinessPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SuccessbussinessPageRoutingModule {}
