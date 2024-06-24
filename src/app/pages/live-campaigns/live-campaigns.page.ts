import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-live-campaigns',
  templateUrl: './live-campaigns.page.html',
  styleUrls: ['./live-campaigns.page.scss'],
})
export class LiveCampaignsPage implements OnInit {
  data: any;
  items: Array<any>;

  constructor(
    public loadingCtrl: LoadingController,
    private route: ActivatedRoute,
  private router: Router,
  ) { }
  ngOnInit() {
    if (this.route && this.route.data) {
      this.getData();
    }
  };

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

  updates() {
    this.router.navigate(['updates']);
  }

  ionViewWillEnter() {
    setTimeout(() => {
      this.data = {
        heading: 'Normal text',
      };
    }, 2000);
  }
}
