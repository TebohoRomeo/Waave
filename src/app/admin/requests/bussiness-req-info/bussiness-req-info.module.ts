import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule} from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { BussinessReqInfoPage } from './bussiness-req-info.page';
import { BussinessRequestResolver } from './bussiness.resolver';

const routes: Routes = [
  {
    path: '',
    component: BussinessReqInfoPage,
    resolve: {
      data:  BussinessRequestResolver
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
  declarations: [BussinessReqInfoPage],
  providers:[BussinessRequestResolver]
})
export class BussinessReqInfoPageModule {}
