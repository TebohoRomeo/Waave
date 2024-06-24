import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,  ReactiveFormsModule, } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AmountRaisedInfoPageRoutingModule } from './amount-raised-info-routing.module';

import { AmountRaisedInfoPage } from './amount-raised-info.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    AmountRaisedInfoPageRoutingModule
  ],
  declarations: [AmountRaisedInfoPage]
})
export class AmountRaisedInfoPageModule {}
