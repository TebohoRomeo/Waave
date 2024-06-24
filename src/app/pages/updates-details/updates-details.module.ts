import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule} from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { UpdatesDetailsPage } from './updates-details.page';
import { DetailsResolver } from './updates.resolver';

const routes: Routes = [
  {
    path: '',
    component: UpdatesDetailsPage,
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
    RouterModule.forChild(routes)
  ],
  declarations: [UpdatesDetailsPage ],
  providers: [DetailsResolver]
})
export class UpdatesDetailsPageModule {}
