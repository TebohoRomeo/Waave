import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BussinessUploadHistoryPage } from './bussiness-upload-history.page';

const routes: Routes = [
  {
    path: '',
    component: BussinessUploadHistoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BussinessUploadHistoryPageRoutingModule {}
