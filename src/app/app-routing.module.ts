/* eslint-disable max-len */
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './adminGuard/admin.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'tabs/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then(m => m.RegisterPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./pages/profile/profile.module').then(m => m.ProfilePageModule),
 canActivate: [AuthGuard]
  },
  {
    path: 'profile-edit',
    loadChildren: () => import('./pages/profile-edit/profile-edit.module').then(m => m.ProfileEditPageModule),
 canActivate: [AuthGuard]
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./pages/forgot-password/forgot-password.module').then(m => m.ForgotPasswordPageModule)
  },
  {
    path: 'donate',
    loadChildren: () => import('./pages/donate/donate.module').then(m => m.DonatePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'tabs',
    loadChildren: () => import('./pages/tabs/tabs.module').then(m => m.TabsPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'settings',
    loadChildren: () => import('./pages/settings/settings.module').then(m => m.SettingsPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'change-password',
    loadChildren: () => import('./pages/change-password/change-password.module').then(m => m.ChangePasswordPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'create-post',
    loadChildren: () => import('./pages/create-post/create-post.module').then(m => m.CreatePostPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/bussiness/bussiness.module').then(m => m.BussinessPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'privacy',
    loadChildren: () => import('./pages/privacy/privacy.module').then(m => m.PrivacyPageModule),
  },
  {
    path: 'upload-bussiness',
    loadChildren: () => import('./pages/upload-bussiness/upload-bussiness.module').then(m => m.UploadBussinessPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'success-donation',
    loadChildren: () => import('./pages/success-donation/success-donation.module').then(m => m.SuccessDonationPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'success-fundraising',
    loadChildren: () => import('./pages/success-fundraising/success-fundraising.module').then(m => m.SuccessFundraisingPageModule),
    canActivate: [AuthGuard]
  },

  {
    path: 'successbussiness',
    loadChildren: () => import('./pages/successbussiness/successbussiness.module').then(m => m.SuccessbussinessPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'free-airtime',
    loadChildren: () => import('./pages/free-airtime/free-airtime.module').then(m => m.FreeAirtimePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'electricity',
    loadChildren: () => import('./pages/electricity/electricity.module').then(m => m.ElectricityPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'food-voucher',
    loadChildren: () => import('./pages/food-voucher/food-voucher.module').then(m => m.FoodVoucherPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'frequently',
    loadChildren: () => import('./pages/frequently/frequently.module').then(m => m.FrequentlyPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'updates',
    loadChildren: () => import('./pages/updates/updates.module').then(m => m.UpdatesPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'airtime-uploader',
    loadChildren: () => import('./admin/airtime/airtime-uploader/airtime-uploader.module').then(m => m.AirtimeUploaderPageModule),
    canActivate: [AdminGuard]
  },
  {
    path: 'fundraiser-uploader',
    loadChildren: () => import('./admin/fundraiser/fundraiser-uploader/fundraiser-uploader.module').then(m => m.FundraiserUploaderPageModule),
      canActivate: [AdminGuard]
  },
  {
    path: 'bussiness-uploader',
    loadChildren: () => import('./admin/bussiness/bussiness-uploader/bussiness-uploader.module').then(m => m.BussinessUploaderPageModule),
    canActivate: [AdminGuard]
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin/admin.module').then(m => m.AdminPageModule),
    canActivate: [AdminGuard]
  },

  {
    path: 'airtime-upload-history',
    loadChildren: () => import('./admin/airtime/airtime-upload-history/airtime-upload-history.module').then(m => m.AirtimeUploadHistoryPageModule),
    canActivate: [AdminGuard]
  },
  {
    path: 'details/:id',
    loadChildren: () => import('./pages/details/details.module').then(m => m.DetailsPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'terms',
    loadChildren: () => import('./pages/terms/terms.module').then(m => m.TermsPageModule)
  },
  {
    path: 'giveaways',
    loadChildren: () => import('./pages/giveaways/giveaways.module').then(m => m.GiveawaysPageModule),
     canActivate: [AuthGuard]
  },
  {
    path: 'bussiness-details/:id',
    loadChildren: () => import('./pages/bussiness-details/bussiness-details.module').then(m => m.BussinessDetailsPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'bussiness-upload-history',
    loadChildren: () => import('./admin/bussiness/bussiness-upload-history/bussiness-upload-history.module').then(m => m.BussinessUploadHistoryPageModule),
     canActivate: [AdminGuard]
  },
  {
    path: 'bussiness-upload-edit/:id',
    loadChildren: () => import('./admin/bussiness/bussiness-upload-edit/bussiness-upload-edit.module').then(m => m.BussinessUploadEditPageModule),
      canActivate: [AdminGuard]
  },
  {
    path: 'fundraiser-upload-history',
    loadChildren: () => import('./admin/fundraiser/fundraiser-upload-history/fundraiser-upload-history.module').then(m => m.FundraiserUploadHistoryPageModule),
        canActivate: [AdminGuard]
  },
  {
    path: 'fundraiser-upload-edit/:id',
    loadChildren: () => import('./admin/fundraiser/fundraiser-upload-edit/fundraiser-upload-edit.module').then(m => m.FundraiserUploadEditPageModule),
        canActivate: [AdminGuard]
  },
  {
    path: 'live-campaigns',
    loadChildren: () => import('./pages/live-campaigns/live-campaigns.module').then( m => m.LiveCampaignsPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'bussiness-requests',
    loadChildren: () => import('./admin/requests/bussiness-requests/bussiness-requests.module').then( m => m.BussinessRequestsPageModule),
    canActivate: [AdminGuard]
  },
  {
    path: 'fundraiser-requests',
    loadChildren: () => import('./admin/requests/fundraiser-requests/fundraiser-requests.module').then( m => m.FundraiserRequestsPageModule),
    canActivate: [AdminGuard]
  },
  {
    path: 'bussiness-req-info/:id',
    loadChildren: () => import('./admin/requests/bussiness-req-info/bussiness-req-info.module').then( m => m.BussinessReqInfoPageModule),
    canActivate: [AdminGuard]
  },
  {
    path: 'fundraiser-req-info/:id',
    loadChildren: () => import('./admin/requests/fundraiser-req-info/fundraiser-req-info.module').then( m => m.FundraiserReqInfoPageModule),
    canActivate: [AdminGuard]
  },
  {
    path: 'amount-raised',
    loadChildren: () => import('./admin/amountRaised/amount-raised/amount-raised.module').then( m => m.AmountRaisedPageModule),
    canActivate: [AdminGuard]
  },
  {
    path: 'amount-raised-info',
    loadChildren: () => import('./admin/amountRaised/amount-raised-info/amount-raised-info.module').then( m => m.AmountRaisedInfoPageModule),
    canActivate: [AdminGuard]
  },
  {
    path: 'payment',
    loadChildren: () => import('./pages/payment/payment.module').then( m => m.PaymentPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'updates-uploader',
    loadChildren: () => import('./admin/updates/updates-uploader/updates-uploader.module').then( m => m.UpdatesUploaderPageModule),
    canActivate: [AdminGuard]
  },
  {
    path: 'updates-history',
    loadChildren: () => import('./admin/updates/updates-history/updates-history.module').then( m => m.UpdatesHistoryPageModule),
    canActivate: [AdminGuard]
  },
  {
    path: 'updates-edit/:id',
    loadChildren: () => import('./admin/updates/updates-edit/updates-edit.module').then( m => m.UpdatesEditPageModule),
    canActivate: [AdminGuard]
  },
  {
    path: 'updates-details/:id',
    loadChildren: () => import('./pages/updates-details/updates-details.module').then( m => m.UpdatesDetailsPageModule)
  },
  {
    path: 'support',
    loadChildren: () => import('./pages/support/support.module').then( m => m.SupportPageModule)
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
