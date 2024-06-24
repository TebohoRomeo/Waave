import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DonatePageRoutingModule } from './donate-routing.module';

import { DonatePage } from './donate.page';

import { Angular4PaystackModule } from 'angular4-paystack';

@NgModule({
  imports: [
    Angular4PaystackModule.forRoot('pk_live_57b10aa8e71309400e962df3ac8cfae849b6fc18'),
    CommonModule,
    FormsModule,
    IonicModule,
    DonatePageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [DonatePage]
})
export class DonatePageModule { }
