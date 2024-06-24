/* eslint-disable quote-props */
/* eslint-disable object-shorthand */
/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { ModalController } from '@ionic/angular';
import { AmountRaisedComponent } from '../../components/amount-raised/amount-raised.component';

@Component({
  selector: 'app-amount-raised',
  templateUrl: './amount-raised.page.html',
  styleUrls: ['./amount-raised.page.scss'],
})
export class AmountRaisedPage implements OnInit {
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
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastController,
    private firestore: AngularFirestore,
    private modalController: ModalController,
    public alertController: AlertController
  ) {
    this.form = this.fb.group({
      story: [null, [Validators.required,]],
      amount: [null, [Validators.required,]],
    });
  }

  saveDetails() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }
    // display form values on success
    this.router.navigate(['/tabs/home']);
    this.toast('Voucher Uploaded. ', 'success');

    this.submitted = false;
    this.form.reset();
  }

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
    addrecord['amount'] = amount;

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
  async UpdateRecord(id, story, amount) {
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
      message: 'Are you sure you want to delete?',
      buttons: [
        {
          text: 'Cancel',
          handler: () => { },
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

  async toast(message, status) {
    const toast = await this.toastr.create({
      message,
      color: status,
      position: 'top',
      duration: 3000,
    });
    toast.present();
  }
}
