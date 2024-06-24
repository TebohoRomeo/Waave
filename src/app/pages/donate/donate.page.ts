/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable id-blacklist */
import { Component, OnInit } from '@angular/core';
import {ToastController } from '@ionic/angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-donate',
  templateUrl: './donate.page.html',
  styleUrls: ['./donate.page.scss'],
})
export class DonatePage implements OnInit {
  reference = '';
  amount: number;
  email: string;
  user: any;

  form: FormGroup;
  submitted = false;

    constructor(
      private toastr: ToastController,
      private fb: FormBuilder,
      private router: Router,
      public auth: AuthService,
    ) {

      this.form = this.fb.group({
        email: [null, [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
        amount:  [null, [Validators.required, Validators.pattern('^[0-9]+$')]],
      });
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

    ngOnInit()
    {
      this.reference = `${Math.floor(Date.now() / 1000)}`;

      this.auth.user$.subscribe(user => this.user = user);
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

   async toast(message, status)
   {
     const toast = await this.toastr.create({
       message,
       color: status,
       position: 'top',
       duration: 3000
     });
     toast.present();
   }
 }

