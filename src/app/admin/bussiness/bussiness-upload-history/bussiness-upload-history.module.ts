// import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';

// import { IonicModule } from '@ionic/angular';

// import { BussinessUploadHistoryPageRoutingModule } from './bussiness-upload-history-routing.module';

// import { BussinessUploadHistoryPage } from './bussiness-upload-history.page';

// @NgModule({
//   imports: [
//     CommonModule,
//     FormsModule,
//     IonicModule,
//     BussinessUploadHistoryPageRoutingModule
//   ],
//   declarations: [BussinessUploadHistoryPage]
// })
// export class BussinessUploadHistoryPageModule {}


import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule} from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { BussinessUploadHistoryPage } from './bussiness-upload-history.page';
import { HomeResolver } from './business.resolver';

const routes: Routes = [
  {
    path: '',
    component: BussinessUploadHistoryPage,
    resolve: {
      data: HomeResolver
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
  declarations: [BussinessUploadHistoryPage],
  providers:[HomeResolver]
})
export class BussinessUploadHistoryPageModule {}

