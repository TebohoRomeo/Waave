import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule} from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { HomeResolver } from './fundraiserreq.resolver';
import { FundraiserRequestsPage } from './fundraiser-requests.page';

const routes: Routes = [
  {
    path: '',
    component: FundraiserRequestsPage,
    resolve: {
      data: HomeResolver
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
  declarations: [FundraiserRequestsPage],
  providers:[HomeResolver]
})
export class FundraiserRequestsPageModule {}
