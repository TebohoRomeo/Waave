import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdatesUploaderPage } from './updates-uploader.page';

const routes: Routes = [
  {
    path: '',
    component: UpdatesUploaderPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdatesUploaderPageRoutingModule {}
