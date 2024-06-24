import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FoodVoucherPage } from './food-voucher.page';

const routes: Routes = [
  {
    path: '',
    component: FoodVoucherPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FoodVoucherPageRoutingModule {}
