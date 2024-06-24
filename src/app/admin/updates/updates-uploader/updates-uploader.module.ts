import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdatesUploaderPageRoutingModule } from './updates-uploader-routing.module';

import { UpdatesUploaderPage } from './updates-uploader.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    UpdatesUploaderPageRoutingModule
  ],
  declarations: [UpdatesUploaderPage]
})
export class UpdatesUploaderPageModule {}
