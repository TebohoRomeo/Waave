/* eslint-disable @typescript-eslint/dot-notation */
import { AlertController, Platform, ToastController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { FirebaseX } from '@awesome-cordova-plugins/firebase-x/ngx';
import { SplashScreen } from '@awesome-cordova-plugins/splash-screen/ngx';
import { StatusBar } from '@awesome-cordova-plugins/status-bar/ngx';

import { Location } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private firebaseX: FirebaseX,
    private locations: Location,
    public alertController: AlertController
  ) {
    this.initializeApp();

    window.addEventListener('offline', () => {
      this.openAlert();
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.statusBar.overlaysWebView(false);
      this.statusBar.backgroundColorByHexString('#222428');
      this.splashScreen.hide();
    });

    this.platform.backButton.subscribeWithPriority(10, (processNextHandler) => {
      console.log('Back press handler!');
      if (this.locations.isCurrentPathEqualTo('/tabs/home')) {

        // Show Exit Alert!
        console.log('Show Exit Alert!');
        this.showExitConfirm();
        processNextHandler();
      } else {

        // Navigate to back page
        console.log('Navigate to back page');
        this.locations.back();
      }
    });


    this.platform.backButton.subscribeWithPriority(5, () => {
      console.log('Handler called to force close!');
      this.alertController.getTop().then(r => {
        if (r) {
          navigator['app'].exitApp();
        }
      }).catch(e => {
        console.log(e);
      });
    });

  }

  showExitConfirm() {
    this.alertController.create({
      header: 'Close app',
      message: 'Do you want to close the app?',
      backdropDismiss: false,
      buttons: [{
        text: 'Stay',
        role: 'cancel',
        handler: () => {
        }
      }, {
        text: 'Exit',
        handler: () => {
          navigator['app'].exitApp();
        }
      }]
    })
      .then(alert => {
        alert.present();
      });
  }

  ngOnInit() {
    this.firebaseX
      .getToken()
      .then((token) => console.log(`The token is ${token}`)) // save the token server-side and use it to push notifications to this device
      .catch((error) => console.error('Error getting token', error));

    this.firebaseX
      .onMessageReceived()
      .subscribe((data) => console.log(`User opened a notification ${data}`));

    this.firebaseX
      .onTokenRefresh()
      .subscribe((token: string) => console.log(`Got a new token ${token}`));
  }

  //alert internet coonection
  async openAlert() {
    const confirm = await this.alertController.create({
      header: 'Check your internet connection',
      message: 'You do not have internet connection',
      mode: 'ios',
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            navigator['app'].exitApp();
          }
        },
      ]
    });
    await confirm.present();
  }
}
