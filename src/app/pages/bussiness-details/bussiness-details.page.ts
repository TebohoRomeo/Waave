/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable id-blacklist */

/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable eqeqeq */
/* eslint-disable @typescript-eslint/prefer-for-of */
/* eslint-disable @typescript-eslint/semi */
/* eslint-disable prefer-const */
/* eslint-disable no-var */

import { Component, OnInit } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';
import { ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-bussiness-details',
  templateUrl: './bussiness-details.page.html',
  styleUrls: ['./bussiness-details.page.scss'],
})
export class BussinessDetailsPage implements OnInit {

  image: any;
  item: any;
  load: boolean = false;

  slideOpts = {
    initialSlide: 1,
    speed: 400,
    slidesPerView: 1.1,
    spaceBetween: 10,
  };

  name: any;
  wapp: any;
  website: any;
  aboutCompany: any;
  call: any;
  location: any;
  email: any;
  productOne: any;
  productTwo: any;
  producthree: any;
  productfour: any;
  constructor(
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.route.data.subscribe(routeData => {
      let data = routeData['data'];
      if (data) {
        this.item = data;
        this.image = this.item.image;
        this.name = this.item.name;
        this.website = this.item.website;
        this.aboutCompany = this.item.aboutCompany;
        this.call = this.item.call;
        this.email = this.item.email;
        this.wapp = this.item.wapp;
        this.location = this.item.location;
        this.productOne = this.item.productOne;
        this.productTwo = this.item.productTwo;
        this.producthree = this.item.producthree;
        this.productfour = this.item.productfour;
      }
    })
  }
}
