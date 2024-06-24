import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule} from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { BussinessDetailsPage } from './bussiness-details.page';
import { DetailsResolver} from './bussiness.resolver';

const routes: Routes = [
  {
    path: '',
    component: BussinessDetailsPage,
    resolve: {
      data:  DetailsResolver
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
  declarations: [BussinessDetailsPage],
  providers:[DetailsResolver]
})
export class BussinessDetailsPageModule {}
