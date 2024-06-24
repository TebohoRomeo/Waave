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
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { LoadingController, ToastController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-updates-details',
  templateUrl: './updates-details.page.html',
  styleUrls: ['./updates-details.page.scss'],
})
export class UpdatesDetailsPage implements OnInit {
  items: Array<any>;

  image: any;
  item: any;
  load: boolean = false;


  title: any;
  description: any;
  storysummary: any;
  receiverName: any;

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
        this.title = this.item.title;
        this.description = this.item.description;
        this.receiverName = this.item.receiverName;
        this.storysummary = this.item.storysummary;
      }
    })
  }

}
