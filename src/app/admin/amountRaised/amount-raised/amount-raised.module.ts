import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AmountRaisedPageRoutingModule } from './amount-raised-routing.module';

import { AmountRaisedPage } from './amount-raised.page';

import { AmountRaisedComponent } from '../../components/amount-raised/amount-raised.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    AmountRaisedPageRoutingModule
  ],
  entryComponents: [AmountRaisedComponent],
  declarations: [AmountRaisedPage, AmountRaisedComponent]
})
export class AmountRaisedPageModule {}
