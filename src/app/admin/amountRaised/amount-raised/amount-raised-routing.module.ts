import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AmountRaisedPage } from './amount-raised.page';

const routes: Routes = [
  {
    path: '',
    component: AmountRaisedPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AmountRaisedPageRoutingModule {}
