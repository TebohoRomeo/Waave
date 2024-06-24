import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LiveCampaignsPage } from './live-campaigns.page';

const routes: Routes = [
  {
    path: '',
    component: LiveCampaignsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LiveCampaignsPageRoutingModule {}
