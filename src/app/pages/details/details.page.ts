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
@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  items: Array<any>;

  image: any;
  item: any;
  load: boolean = false;

  reference = '';
  name: string;
  amount: number;
  email: string;
  user: any;

  form: FormGroup;
  submitted = false;

  title: any;
  description: any;
  targetAmount: any;
  raisedAmount: any;
  endingDAte: any;
  references: any;
  benefactors: any;
  receiverName: any;
  constructor(
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastController,
    private fb: FormBuilder,

  ) {
    this.form = this.fb.group({
      ref: [null, [Validators.required, Validators.maxLength(30)]],
      email: [null, [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      amount: [null, [Validators.required, Validators.pattern('^[0-9]+$')]],
    });
  }

  ngOnInit() {
    this.getData();
    this.reference = `${Math.floor(Date.now() / 1000)}`;
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
        this.targetAmount = this.item.targetAmount;
        this.raisedAmount = this.item.raisedAmount;
        this.references = this.item.references;
        this.endingDAte = this.item.endingDAte;
      }
    })
  }

  paymentInit() {
    this.toast('Proccesing your payment', 'warning');
  }

  paymentDone(ref: any) {
    this.router.navigate(['/success-donation']);
    this.toast('Thank you for your donation, God bless you. ', 'success');
  }

  paymentCancel() {
    this.toast('Donation cancelled', 'danger');
  }


  onDonate() {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }
  }

  onReset() {
    this.submitted = false;
    this.form.reset();
  }

  async toast(message, status) {
    const toast = await this.toastr.create({
      message,
      color: status,
      position: 'top',
      duration: 5000
    });
    toast.present();
  }

}
