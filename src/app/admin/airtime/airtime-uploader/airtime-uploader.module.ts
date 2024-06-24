import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AirtimeUploaderPageRoutingModule } from './airtime-uploader-routing.module';

import { AirtimeUploaderPage } from './airtime-uploader.page';

import { UpdateairtimeRecordComponent } from '../../components/updateairtime-record/updateairtime-record.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    AirtimeUploaderPageRoutingModule
  ],
  entryComponents: [UpdateairtimeRecordComponent],
  declarations: [AirtimeUploaderPage, UpdateairtimeRecordComponent]
})
export class AirtimeUploaderPageModule { }
