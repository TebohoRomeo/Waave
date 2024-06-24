import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { FundraiserUploadHistoryPage } from './fundraiser-upload-history.page';
import { HomeResolver } from './fundraiser.resolver';

const routes: Routes = [
  {
    path: '',
    component: FundraiserUploadHistoryPage,
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
  declarations: [FundraiserUploadHistoryPage],
  providers: [
    HomeResolver
  ]
})
export class FundraiserUploadHistoryPageModule { }
