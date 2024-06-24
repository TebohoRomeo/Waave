import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AmountRaisedInfoPage } from './amount-raised-info.page';

const routes: Routes = [
  {
    path: '',
    component: AmountRaisedInfoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AmountRaisedInfoPageRoutingModule {}
