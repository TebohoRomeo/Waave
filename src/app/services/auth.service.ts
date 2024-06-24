/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<User>;
  uid: any;

  constructor(
    private afs: AngularFirestore,
    private afauth: AngularFireAuth,
    private router: Router,
    private LoadingCtrl: LoadingController,
    private toastr: ToastController
  ) {
    this.user$ = this.afauth.authState
      .pipe(
        switchMap(user => {

          if (user) {
            return this.afs.doc<User>(`user/${user.uid}`).valueChanges();

          } else {
            return of(null);
          }
        })
      );
  }

  async signIn(email: string, password: string) {
    const loading = await this.LoadingCtrl.create({

      message: 'Signing In',
      spinner: 'crescent',
      showBackdrop: true
    });

    loading.present();

    this.afauth.setPersistence(firebase.default.auth.Auth.Persistence.LOCAL).then(() => {
      this.afauth.signInWithEmailAndPassword(email, password).then((data) => {
        if (!data.user.emailVerified) {
          loading.dismiss();
          this.toast('please verify your email address!', 'warning');
          this.afauth.signOut();
        } else {
          loading.dismiss();
          this.router.navigate(['tabs/home']);
        }
      })
        .catch(error => {
          loading.dismiss();
          this.toast(error.message, 'danger');
        });
    })
      .catch(error => {
        loading.dismiss();
        this.toast(error.message, 'danger');
      });

  } //end of signin

  async signOut() {
    const loading = await this.LoadingCtrl.create({
      spinner: 'crescent',
      showBackdrop: true
    });
    loading.present();

    this.afauth.signOut()
      .then(() => {
        loading.dismiss();
        this.router.navigate(['/login']);
      });
    this.afauth.signOut();
  }

  async toast(message, status) {
    const toast = await this.toastr.create({
      message,
      color: status,
      position: 'top',
      duration: 3000
    });
    toast.present();
  }

  canRead(user: User): boolean {
    const allowed = ['admin'];
    return this.checkAuthorization(user, allowed);
  }

  canEdit(user: User): boolean {
    const allowed = ['admin',];
    return this.checkAuthorization(user, allowed);
  }

  canDelete(user: User): boolean {
    const allowed = ['admin'];
    return this.checkAuthorization(user, allowed);
  }

  // determines if user has matching role
  private checkAuthorization(user: User, allowedRoles: string[]): boolean {
    if (!user) { 
      console.log('check authorization, whats ip');
      return false;
  };
    for (const role of allowedRoles) {
      if (user.roles[role]) {
        return true;
      }
    }
    return false;
  }
}
