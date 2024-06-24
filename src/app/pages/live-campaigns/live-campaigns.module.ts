import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { LiveCampaignsPage } from './live-campaigns.page';

import { HomeResolver } from './live.resolver';

const routes: Routes = [
  {
    path: '',
    component: LiveCampaignsPage,
    resolve: {
      data: HomeResolver
    }
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [LiveCampaignsPage],
  providers: [
    HomeResolver
  ]
})
export class LiveCampaignsPageModule {}
