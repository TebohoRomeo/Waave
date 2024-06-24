import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { Component, OnInit } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {

  email: string;
  form: FormGroup;
  submitted = false;

  constructor(
    private afauth: AngularFireAuth,
    private toastr: ToastController,
    private router: Router,
    private loadingCtrl: LoadingController,
    private fb: FormBuilder,
  ) {
    this.form = this.fb.group({
      email: [null, [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
    });
  }

  ngOnInit() {
  }

  async resetPassword() {
    if (this.email) {
      const loading = await this.loadingCtrl.create({
        message: 'Sending reset passowrd link..',
        spinner: 'crescent',
        showBackdrop: true
      });
      loading.present();

      this.afauth.sendPasswordResetEmail(this.email).then(() => {
        loading.dismiss();
        this.toast('please check your email or spam folder', 'success');
        this.router.navigate(['/login']);
      })
        .catch((error) => {
          loading.dismiss();
          this.toast(error.message, 'danger');
        });
    } else {
      this.toast('please enter your email address', 'danger');
    }
  }  //end of forgot password

  onForgot() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    // reset form
    {
      this.submitted = false;
      this.form.reset();
    }
  }

  async toast(message, status) {
    const toast = await this.toastr.create({
      message,
      color: status,
      position: 'top',
      duration: 5000
    });
    toast.present();
  } // end of toast
}

