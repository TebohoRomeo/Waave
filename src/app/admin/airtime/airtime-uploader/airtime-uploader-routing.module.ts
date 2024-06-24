import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AirtimeUploaderPage } from './airtime-uploader.page';

const routes: Routes = [
  {
    path: '',
    component: AirtimeUploaderPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AirtimeUploaderPageRoutingModule {}
