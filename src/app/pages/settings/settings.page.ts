import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  user: any;

  constructor(
    public auth: AuthService,
    private router: Router,
    public alertController: AlertController
  ) { }

  async alertLogout() {
    const confirm = await this.alertController.create({
      header: 'Wait!',
      message: 'Are you sure you want to logout?',
      buttons: [
        {
          text: 'Cancel',
          handler: () => { },
        },
        {
          text: 'Ok',
          handler: () => {
            this.auth.signOut();
          },
        },
      ],
    });
    await confirm.present();
  }

  changePassword() {
    this.router.navigate(['change-password']);
  }

  goToQuestion() {
    this.router.navigate(['question']);
  }

  goToPrivacy() {
    this.router.navigate(['privacy']);
  }

  goTofrequently() {
    this.router.navigate(['frequently']);
  }

  goToterms() {
    this.router.navigate(['terms']);
  }

  goToAdmin() {
    this.router.navigate(['admin']);
  }

  ngOnInit() {
    this.auth.user$.subscribe(user => this.user = user);
  }

  editPost() {
    if (this.auth.canEdit(this.user)) { }
    else {
      console.error('you are not allowed to do that!');
    }
  }
}
