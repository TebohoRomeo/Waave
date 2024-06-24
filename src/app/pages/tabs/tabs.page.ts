import { CreatePostPage } from './../create-post/create-post.page';
import { Component, ViewChild } from '@angular/core';
import { IonTabs } from '@ionic/angular';
import { ModalController } from '@ionic/angular';


@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  @ViewChild(IonTabs) tabs;
  selected = '';
  constructor(public modalController: ModalController) {}

  setSelectedTab() {
    this.selected = this.tabs.getSelected();
  }

  public async createFundraiser() {
    const modal = await this.modalController.create({
      component: CreatePostPage,
      cssClass: 'image-view-radius',
      mode: 'ios',
      // breakpoints: [1, 0], // Breakpoints can be changes to modify te modal reach height
      // initialBreakpoint: 1, // ''
      // handle: false,
    });
    return await modal.present();
  }
}
