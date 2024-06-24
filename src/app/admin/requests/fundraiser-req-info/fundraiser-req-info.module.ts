import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule} from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { FundraiserReqInfoPage } from './fundraiser-req-info.page';
import {  FundraiserRequestResolver } from './fundraiser.resolver';

const routes: Routes = [
  {
    path: '',
    component: FundraiserReqInfoPage,
    resolve: {
      data:   FundraiserRequestResolver
    }
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [FundraiserReqInfoPage],
  providers: [FundraiserRequestResolver]
})
export class FundraiserReqInfoPageModule {}
