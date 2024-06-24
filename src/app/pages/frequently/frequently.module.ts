import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FrequentlyPageRoutingModule } from './frequently-routing.module';

import { FrequentlyPage } from './frequently.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FrequentlyPageRoutingModule
  ],
  declarations: [FrequentlyPage]
})
export class FrequentlyPageModule {}
