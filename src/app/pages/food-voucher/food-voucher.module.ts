import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FoodVoucherPageRoutingModule } from './food-voucher-routing.module';

import { FoodVoucherPage } from './food-voucher.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FoodVoucherPageRoutingModule
  ],
  declarations: [FoodVoucherPage]
})
export class FoodVoucherPageModule {}
