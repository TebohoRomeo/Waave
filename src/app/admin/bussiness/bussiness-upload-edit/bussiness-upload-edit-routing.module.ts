import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BussinessUploadEditPage } from './bussiness-upload-edit.page';

const routes: Routes = [
  {
    path: '',
    component: BussinessUploadEditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BussinessUploadEditPageRoutingModule {}
