/* eslint-disable @typescript-eslint/ban-types */
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
})
export class ChangePasswordPage implements OnInit {
  userId: any;
  password: any;
  form: FormGroup;
  submitted = false;

  constructor(
    private auth: AuthService,
    private afs: AngularFirestore,
    private router: Router,
    private loadingCtrl: LoadingController,
    private toastr: ToastController,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      password: [null, [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit() {
    this.auth.user$.subscribe((user) => {
      this.userId = user.userId;
      this.password = user.userPassword;
    });
  }

  async updateProfile() {
    const loading = await this.loadingCtrl.create({
      message: 'Changing password...',
      spinner: 'crescent',
      showBackdrop: true,
    });

    loading.present();

    this.afs
      .collection('user')
      .doc(this.userId)
      .set(
        {
          userPassword: this.password,
        },
        { merge: true }
      )
      .then(() => {
        loading.dismiss();
        this.toast('Password Successfully Changed', 'success');
        this.router.navigate(['change-password']);
      })
      .catch((error) => {
        loading.dismiss();
        this.toast(error.message, 'danger');
      });
  }

  onChange() {
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

  async toast(message: string, status: string) {
    const toast = await this.toastr.create({
      message,
      color: status,
      position: 'top',
      duration: 3000,
    });
    toast.present();
  } // end of toast
}
