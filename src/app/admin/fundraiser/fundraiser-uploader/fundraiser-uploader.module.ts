import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FundraiserUploaderPageRoutingModule } from './fundraiser-uploader-routing.module';

import { FundraiserUploaderPage } from './fundraiser-uploader.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    FundraiserUploaderPageRoutingModule
  ],
  declarations: [FundraiserUploaderPage]
})
export class FundraiserUploaderPageModule {}
