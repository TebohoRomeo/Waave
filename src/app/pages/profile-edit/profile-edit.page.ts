/* eslint-disable @typescript-eslint/ban-types */
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { LoadingController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.page.html',
  styleUrls: ['./profile-edit.page.scss'],
})
export class ProfileEditPage implements OnInit {
  userId: any;
  name: String;
  email: String;
  phone: String;

  form: FormGroup;
  submitted = false;

  constructor(
    private auth: AuthService,
    private afs: AngularFirestore,
    private router: Router,
    private loadingCtrl: LoadingController,
    private toastr: ToastController,
    private fb: FormBuilder,

  ) {

    this.form = this.fb.group({
        name: [null, [Validators.required, Validators.minLength(3),  Validators.maxLength(20)]],
        email: [null, [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
        phone:  [null, [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('^[0-9]+$')]],
    });
  }

  ngOnInit() {
    this.auth.user$.subscribe((user) => {
      this.userId = user.userId;
      this.name = user.userName;
      this.email = user.userEmail;
      this.phone = user.userPhone;
    });
  }

  async updateProfile() {
    const loading = await this.loadingCtrl.create({
      message: 'Proccessing...',
      spinner: 'crescent',
      showBackdrop: true,
    });

    loading.present();

    this.afs
      .collection('user')
      .doc(this.userId)
      .set(
        {
          userName: this.name,
          userEmail: this.email,
          userPhone: this.phone,
          editAt: Date.now(),
        },
        { merge: true }
      )
      .then(() => {
        loading.dismiss();
        this.toast('Info Updated Successfully', 'success');
        this.router.navigate(['/tabs/profile']);
      })
      .catch((error) => {
        loading.dismiss();
        this.toast(error.message, 'danger');
      });
  }


  onEdit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    // display form values on success
    // this.router.navigate(['/forgot-password']);
  }

  onReset() {
    this.submitted = false;
    this.form.reset();
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


