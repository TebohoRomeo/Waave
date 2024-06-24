import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FundraiserUploadHistoryPage } from './fundraiser-upload-history.page';

const routes: Routes = [
  {
    path: '',
    component: FundraiserUploadHistoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FundraiserUploadHistoryPageRoutingModule {}
