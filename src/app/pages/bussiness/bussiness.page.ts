/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/dot-notation */

import { Component, OnInit, } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
// import { AdMob } from '@ionic-native/admob-plus';
@Component({
  selector: 'app-bussiness',
  templateUrl: './bussiness.page.html',
  styleUrls: ['./bussiness.page.scss'],
})
export class BussinessPage implements OnInit {
  selected = '';
  user: any;
  data: any;

  items: Array<any>;

  constructor(
    private router: Router,
    private auth: AuthService,
   // public admob: AdMobOriginal,
    public loadingCtrl: LoadingController,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.auth.user$.subscribe(user => {
      this.user = user;
    });

    if (this.route && this.route.data) {
      this.getData();
    }
  };

  gotoProfile() {
    this.router.navigate(['/profile']);
  }

  gotoDonate() {
    this.router.navigate(['/donate']);
  }

  goToCreatePost() {
    this.router.navigate(['/upload-bussiness']);
  }
  ionViewWillEnter() {
    setTimeout(() => {
      this.data = {
        heading: 'Normal text',

      };
    }, 2000);
  }

  async getData() {
    const loading = await this.loadingCtrl.create({
      message: 'Please wait...'
    });
    this.presentLoading(loading);

    this.route.data.subscribe(routeData => {
      routeData['data'].subscribe(data => {
        loading.dismiss();
        this.items = data;
      });
    });
  }

  async presentLoading(loading) {
    return await loading.present();
  }
}
