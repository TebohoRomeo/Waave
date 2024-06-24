import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AirtimeUploadHistoryPage } from './airtime-upload-history.page';

const routes: Routes = [
  {
    path: '',
    component: AirtimeUploadHistoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AirtimeUploadHistoryPageRoutingModule {}
