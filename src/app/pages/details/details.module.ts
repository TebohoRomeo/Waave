import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { Angular4PaystackModule } from 'angular4-paystack';
import { IonicModule } from '@ionic/angular';
import { DetailsPage } from './details.page';
import { DetailsResolver } from './details.resolver';

const routes: Routes = [
  {
    path: '',
    component: DetailsPage,
    resolve: {
      data: DetailsResolver
    }
  }
];

@NgModule({
  imports: [
    Angular4PaystackModule.forRoot('pk_live_57b10aa8e71309400e962df3ac8cfae849b6fc18'),
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DetailsPage],
  providers: [DetailsResolver]
})
export class DetailsPageModule { }
