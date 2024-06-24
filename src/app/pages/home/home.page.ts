/* eslint-disable @typescript-eslint/adjacent-overload-signatures */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable @typescript-eslint/member-ordering */

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { LoadingController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
 import { AdMob } from '@ionic-native/admob-plus';
import { AngularFirestore } from '@angular/fire/firestore';
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  selected = '';
  user: any;
  data: any;

  items: Array<any>;
  slideOpt = {
    initialSlide: 1,
    speed: 400,
  };

  doc: any;
  records: {
    id: string;
    story: string;
    amount: number;
  }[];

  addrecord: {
    story: string;
    amount: number;
  };

  constructor(
    private auth: AuthService,
    private router: Router,
    public loadingCtrl: LoadingController,
    private route: ActivatedRoute,
    private firestore: AngularFirestore,
    public admob: AdMob
  ) { }

  ngOnInit() {
    this.auth.user$.subscribe(user => {
      this.user = user;
    });

    if (this.route && this.route.data) {
      this.getData();
    }

    this.addrecord = {
      story: '',
      amount: null,
    };
    this.firestore
      .collection('/RaisedCash/')
      .snapshotChanges()
      .subscribe((res) => {
        if (res) {
          this.records = res.map((e) => ({
            id: e.payload.doc.id,
            story: e.payload.doc.data()['story'],
            amount: e.payload.doc.data()['amount'],
          }));
        }
      });
  };


  AddRecord(story, amount) {
    const addrecord = {};
    addrecord['story'] = story;
    addrecord['amount;'] = amount;

    console.log(addrecord);
    this.firestore
      .collection('/RaisedCash/')
      .add(addrecord)
      .then(() => {
        this.addrecord = {
          story: '',
          amount: null,
        };
      });
  }

  gotoProfile() {
    this.router.navigate(['/profile']);
  }

  goSettings() {
    this.router.navigate(['/settings']);
  }

  gotoDonate() {
    this.router.navigate(['/donate']);
  }


  goTobussiness() {
    this.router.navigate(['tabs/bussiness']);
  }

  goTogiveaways() {
    this.router.navigate(['tabs/giveaways']);
  }


  goToCreatePost() {
    this.router.navigate(['/create-post']);
  }

  goToDonate() {
    this.router.navigate(['/donate']);
  }

  goToUpdates() {
    this.router.navigate(['/updates']);
  }

  goTolive() {
    this.router.navigate(['/live-campaigns']);
  }

  interstitialsAd() {
    this.admob.interstitial.load({
      id: {
        // replace with your ad unit IDs
        android: 'ca-app-pub-3782350151456053/8648638836',
        ios: 'test'
      },
    }).then(() => this.admob.interstitial.show());
  }


  slideOpts = {
    initialSlide: 0,
    speed: 1000,
    slidesPerView: 2.5,
    spaceBetween: 10,
    slidesOffsetBefore: 10,
    slidesOffsetAfter: 10,
  };

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
      routeData.data.subscribe(data => {
        loading.dismiss();
        this.items = data;
      });
    });
  }

  async presentLoading(loading) {
    return await loading.present();
  }

}
