import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SuccessbussinessPageRoutingModule } from './successbussiness-routing.module';

import { SuccessbussinessPage } from './successbussiness.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SuccessbussinessPageRoutingModule
  ],
  declarations: [SuccessbussinessPage]
})
export class SuccessbussinessPageModule {}
