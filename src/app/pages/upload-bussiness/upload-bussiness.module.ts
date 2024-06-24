import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,  ReactiveFormsModule  } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UploadBussinessPageRoutingModule } from './upload-bussiness-routing.module';

import { UploadBussinessPage } from './upload-bussiness.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UploadBussinessPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [UploadBussinessPage]
})
export class UploadBussinessPageModule {}
