import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,  ReactiveFormsModule, } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AirtimeUploadHistoryPageRoutingModule } from './airtime-upload-history-routing.module';

import { AirtimeUploadHistoryPage } from './airtime-upload-history.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    AirtimeUploadHistoryPageRoutingModule
  ],
  declarations: [AirtimeUploadHistoryPage]
})
export class AirtimeUploadHistoryPageModule {}
