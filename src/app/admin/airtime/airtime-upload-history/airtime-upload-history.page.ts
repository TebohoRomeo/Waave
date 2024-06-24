/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable quote-props */
/* eslint-disable object-shorthand */
/* eslint-disable @typescript-eslint/dot-notation */
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { UpdateairtimeRecordComponent } from '../../components/updateairtime-record/updateairtime-record.component';
import { AngularFirestore } from '@angular/fire/firestore';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-airtime-upload-history',
  templateUrl: './airtime-upload-history.page.html',
  styleUrls: ['./airtime-upload-history.page.scss'],
})
export class AirtimeUploadHistoryPage implements OnInit {
  form: FormGroup;
  submitted = false;

  doc: any;
  records: {
    id: string;
    airtimeTpye: string;
    voucherType: string;
    voucherCode: number;
    timeUpdate: string;
    type: string;
  }[];

  addrecord: {
    type: string;
    airtimeTpye: string;
    voucherType: string;
    voucherCode: number;
    timeUpdate: string;
  };

  constructor(
    private firestore: AngularFirestore,
    private modalController: ModalController,
    public alertController: AlertController
  ) {}

  ngOnInit() {
    this.addrecord = {
      type: '',
      airtimeTpye: '',
      voucherType: '',
      timeUpdate: '',
      voucherCode: null,
    };
    this.firestore
      .collection('/AirtimeVRecords/')
      .snapshotChanges()
      .subscribe((res) => {
        if (res) {
          this.records = res.map((e) => ({
            id: e.payload.doc.id,
            airtimeTpye: e.payload.doc.data()['airtimeTpye'],
            voucherType: e.payload.doc.data()['voucherType'],
            voucherCode: e.payload.doc.data()['voucherCode'],
            timeUpdate: e.payload.doc.data()['timeUpdate'],
            type: e.payload.doc.data()['type'],
          }));
        }
      });
  }

  AddRecord(type, airtimeTpye, voucherType, voucherCode, timeUpdate) {
    const addrecord = {};
    addrecord['type'] = type;
    addrecord['airtimeTpye'] = airtimeTpye;
    addrecord['voucherType'] = voucherType;
    addrecord['voucherCode'] = voucherCode;
    addrecord['timeUpdate'] = timeUpdate;
    console.log(addrecord);
    this.firestore
      .collection('/AirtimeVRecords/')
      .add(addrecord)
      .then(() => {
        this.addrecord = {
          type: '',
          airtimeTpye: '',
          voucherType: '',
          timeUpdate: '',
          voucherCode: null,
        };
      });
  }

  async UpdateRecord(id, type, airtimeTpye, voucherType) {
    const modal = await this.modalController.create({
      component: UpdateairtimeRecordComponent,
      cssClass: 'my-custom-class',
      componentProps: {
        id: id,
        type: type,
        description: airtimeTpye,
        amount: voucherType,
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
            this.firestore.doc('/AirtimeVRecords/' + id).delete();
          },
        },
      ],
    });
    await confirm.present();
  }
}
