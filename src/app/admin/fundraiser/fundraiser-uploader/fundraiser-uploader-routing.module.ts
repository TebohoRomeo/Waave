import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FundraiserUploaderPage } from './fundraiser-uploader.page';

const routes: Routes = [
  {
    path: '',
    component: FundraiserUploaderPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FundraiserUploaderPageRoutingModule {}
