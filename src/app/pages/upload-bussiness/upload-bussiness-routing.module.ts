import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UploadBussinessPage } from './upload-bussiness.page';

const routes: Routes = [
  {
    path: '',
    component: UploadBussinessPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UploadBussinessPageRoutingModule {}
