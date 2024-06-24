import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule} from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { HomeResolver } from './bussinessreq.resolver';
import { BussinessRequestsPage } from './bussiness-requests.page';

const routes: Routes = [
  {
    path: '',
    component: BussinessRequestsPage,
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
  declarations: [BussinessRequestsPage],
  providers:[HomeResolver]
})

export class BussinessRequestsPageModule {}

