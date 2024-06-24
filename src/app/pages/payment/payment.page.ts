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
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
})
export class PaymentPage implements OnInit {

  reference = '';
  name: string;
  amount: number;
  email: string;
  user: any;

  form: FormGroup;
  submitted = false;

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
    });
  }

  ngOnInit() {
    this.reference = `${Math.floor(Date.now() / 1000)}`;
  }

  paymentInit() {
    this.toast('Proccesing your payment', 'warning');
  }

  paymentDone(ref: any) {
    this.router.navigate(['/successbussiness']);
    this.toast('Submitted for review. ', 'success');
  }

  paymentCancel() {
    this.toast('payment cancelled', 'danger');
    this.router.navigate(['/upload-bussiness']);
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
