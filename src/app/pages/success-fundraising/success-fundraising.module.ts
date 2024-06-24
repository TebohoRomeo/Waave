import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SuccessFundraisingPageRoutingModule } from './success-fundraising-routing.module';

import { SuccessFundraisingPage } from './success-fundraising.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SuccessFundraisingPageRoutingModule
  ],
  declarations: [SuccessFundraisingPage]
})
export class SuccessFundraisingPageModule {}
