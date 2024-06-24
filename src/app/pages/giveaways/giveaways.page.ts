/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdMob } from '@ionic-native/admob-plus';
@Component({
  selector: 'app-giveaways',
  templateUrl: './giveaways.page.html',
  styleUrls: ['./giveaways.page.scss'],
})
export class GiveawaysPage implements OnInit {
  datas: any;

  constructor(
    private router: Router,
    public admob: AdMob
     ) { }

  ngOnInit() { }

  showInterstitialAds() {
    this.admob.interstitial.load({
      id: {
        // replace with your ad unit IDs
        android: 'ca-app-pub-3782350151456053/8648638836',
        ios: 'test'
      },
    }).then(() => this.admob.interstitial.show());
  }

  showRewardVideoAds() {
    this.admob.rewardVideo.load({
      id: {
        // replace with your ad unit IDs
        android: 'ca-app-pub-3782350151456053/6807849645',
        ios: 'test'
      },
    }).then(() => this.admob.rewardVideo.show());
  }

  Airtime() {
    this.router.navigate(['/free-airtime']);
  }

  GoToVouchers() {
    this.router.navigate(['/food-voucher']);
  }

  GoToElectricity() {
    this.router.navigate(['/electricity']);
  }

  ionViewWillEnter() {
    setTimeout(() => {
      this.datas = {
        heading: 'Normal text',
      };
    }, 2000);
  }
}
