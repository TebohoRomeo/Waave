import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FrequentlyPage } from './frequently.page';

const routes: Routes = [
  {
    path: '',
    component: FrequentlyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FrequentlyPageRoutingModule {}
