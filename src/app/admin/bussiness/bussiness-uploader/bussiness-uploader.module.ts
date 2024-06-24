import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BussinessUploaderPageRoutingModule } from './bussiness-uploader-routing.module';

import { BussinessUploaderPage } from './bussiness-uploader.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    BussinessUploaderPageRoutingModule
  ],
  declarations: [BussinessUploaderPage]
})
export class BussinessUploaderPageModule {}
