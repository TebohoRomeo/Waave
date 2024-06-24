/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable quote-props */
/* eslint-disable object-shorthand */
/* eslint-disable @typescript-eslint/dot-notation */
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { AmountRaisedComponent } from '../../components/amount-raised/amount-raised.component';
import { AngularFirestore } from '@angular/fire/firestore';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-amount-raised-info',
  templateUrl: './amount-raised-info.page.html',
  styleUrls: ['./amount-raised-info.page.scss'],
})
export class AmountRaisedInfoPage implements OnInit {
  form: FormGroup;
  submitted = false;

  doc: any;
  records: {
    id: string;
    story: string;
    amount: number;
  }[];

  addrecord: {
    story: string;
    amount: number;
  };

  constructor(
    private firestore: AngularFirestore,
    private modalController: ModalController,
    public alertController: AlertController
  ) {}

  ngOnInit() {
    this.addrecord = {
      story: '',
      amount: null,
    };
    this.firestore
      .collection('/RaisedCash/')
      .snapshotChanges()
      .subscribe((res) => {
        if (res) {
          this.records = res.map((e) => ({
            id: e.payload.doc.id,
            story: e.payload.doc.data()['story'],
            amount: e.payload.doc.data()['amount'],
          }));
        }
      });
  }

  AddRecord(story, amount) {
    const addrecord = {};
    addrecord['story'] = story;
    addrecord['amount;'] = amount;

    console.log(addrecord);
    this.firestore
      .collection('/RaisedCash/')
      .add(addrecord)
      .then(() => {
        this.addrecord = {
          story: '',
          amount: null,
        };
      });
  }

  async UpdateRecord(id, amount, story) {
    const modal = await this.modalController.create({
      component: AmountRaisedComponent,
      cssClass: 'my-custom-class',
      componentProps: {
        id: id,
        description: story,
        amount: amount,
      },
    });
    return await modal.present();
  }

  async DeleteRecord(id) {
    const confirm = await this.alertController.create({
      header: 'Wait!',
      mode: 'ios',
      message: 'Are you sure you want to delete?',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {},
        },
        {
          text: 'Ok',
          handler: () => {
            this.firestore.doc('/RaisedCash/' + id).delete();
          },
        },
      ],
    });
    await confirm.present();
  }
}
