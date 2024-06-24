import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { FundraiserUploadEditPage } from './fundraiser-upload-edit.page';
import { DetailsResolver } from './fundraiser.resolver';

const routes: Routes = [
  {
    path: '',
    component: FundraiserUploadEditPage,
    resolve: {
      data: DetailsResolver
    }
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [FundraiserUploadEditPage],
  providers: [DetailsResolver]
})
export class FundraiserUploadEditPageModule { }
