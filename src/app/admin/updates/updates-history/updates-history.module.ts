import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { UpdatesHistoryPage } from './updates-history.page';
import { HomeResolver } from './updates.resolver';

const routes: Routes = [
  {
    path: '',
    component:  UpdatesHistoryPage,
    resolve: {
      data: HomeResolver
    }
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [UpdatesHistoryPage],
  providers: [
    HomeResolver
  ]
})
export class UpdatesHistoryPageModule {}
