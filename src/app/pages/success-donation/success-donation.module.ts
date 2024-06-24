import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SuccessDonationPageRoutingModule } from './success-donation-routing.module';

import { SuccessDonationPage } from './success-donation.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SuccessDonationPageRoutingModule
  ],
  declarations: [SuccessDonationPage]
})
export class SuccessDonationPageModule {}
