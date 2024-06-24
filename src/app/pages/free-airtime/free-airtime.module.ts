import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FreeAirtimePageRoutingModule } from './free-airtime-routing.module';

import { FreeAirtimePage } from './free-airtime.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FreeAirtimePageRoutingModule
  ],
  declarations: [FreeAirtimePage]
})
export class FreeAirtimePageModule {}
