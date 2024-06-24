import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FreeAirtimePage } from './free-airtime.page';

const routes: Routes = [
  {
    path: '',
    component: FreeAirtimePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FreeAirtimePageRoutingModule {}
