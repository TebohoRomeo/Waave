import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonTabs } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  @ViewChild(IonTabs) tabs: { getSelected: () => string };
  selected = '';
  user: any;
  data: any;
  postRef: any;
  constructor(
    public auth: AuthService,
    private router: Router,
    public alertController: AlertController
  ) { }

  ngOnInit() {
    this.auth.user$.subscribe(user => this.user = user);
  }

  editPost() {
    if (this.auth.canEdit(this.user)) { }
    else {
      console.error('you are not allowed to do that!');
    }
  }


  editProfile() {
    this.router.navigate(['profile-edit']);
  }

  setSelectedTab() {
    this.selected = this.tabs.getSelected();
  }



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


  ionViewWillEnter() {
    setTimeout(() => {
      this.data = {
        heading: 'Normal text',

      };
    }, 2000);
  }
}
