import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FundraiserUploadEditPage } from './fundraiser-upload-edit.page';

const routes: Routes = [
  {
    path: '',
    component: FundraiserUploadEditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FundraiserUploadEditPageRoutingModule {}
