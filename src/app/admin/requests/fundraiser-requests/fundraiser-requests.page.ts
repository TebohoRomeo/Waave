/* eslint-disable @typescript-eslint/member-ordering */

import { Component, OnInit,  } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-fundraiser-requests',
  templateUrl: './fundraiser-requests.page.html',
  styleUrls: ['./fundraiser-requests.page.scss'],
})
export class FundraiserRequestsPage implements OnInit {
  data: any;

  items: Array<any>;

  constructor(
    public loadingCtrl: LoadingController,
    private route: ActivatedRoute
    )
    {}

    ngOnInit()
    {
     if (this.route && this.route.data) {
        this.getData();
      }
   };


  async getData(){
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
