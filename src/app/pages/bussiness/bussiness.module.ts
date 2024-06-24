import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { BussinessPage } from './bussiness.page';
import { HomeResolver } from './bussiness.resolver';

const routes: Routes = [
  {
    path: '',
    component: BussinessPage,
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
  declarations: [BussinessPage],
  providers: [
    HomeResolver
  ]
})
export class BussinessPageModule { }



