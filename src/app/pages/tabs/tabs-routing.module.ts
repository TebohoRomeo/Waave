import { SupportPageModule } from './../support/support.module';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('../home/home.module').then(m => m.HomePageModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'profile',
        loadChildren: () => import('../profile/profile.module').then(m => m.ProfilePageModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'bussiness',
        loadChildren: () => import('../bussiness/bussiness.module').then(m => m.BussinessPageModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'giveaways',
        loadChildren: () => import('../giveaways/giveaways.module').then(m => m.GiveawaysPageModule),
         canActivate: [AuthGuard]
      },
      {
        path: 'support',
        loadChildren: () => import('../support/support.module').then(m => m.SupportPageModule),
         canActivate: [AuthGuard]
      },
      {
        path: '',
        redirectTo: 'tabs/bussiness',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: 'tabs/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule { }
