import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { UpdatesEditPage } from './updates-edit.page';
import { DetailsResolver } from './updates.resolver';

const routes: Routes = [
  {
    path: '',
    component: UpdatesEditPage,
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
  declarations: [UpdatesEditPage],
  providers: [DetailsResolver]
})
export class UpdatesEditPageModule {}
