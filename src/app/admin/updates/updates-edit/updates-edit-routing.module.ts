import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdatesEditPage } from './updates-edit.page';

const routes: Routes = [
  {
    path: '',
    component: UpdatesEditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdatesEditPageRoutingModule {}
