/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable quote-props */
/* eslint-disable object-shorthand */
/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { AdMob } from '@ionic-native/admob-plus';
import { AngularFirestore } from '@angular/fire/firestore';
import { ModalController, ToastController } from '@ionic/angular';
import { UpdateairtimeRecordComponent } from 'src/app/admin/components/updateairtime-record/updateairtime-record.component';


@Component({
  selector: 'app-free-airtime',
  templateUrl: './free-airtime.page.html',
  styleUrls: ['./free-airtime.page.scss'],
})

export class FreeAirtimePage implements OnInit {
  datas: any;
  doc: any;
  voucherCode: any;

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
    private toastr: ToastController,
    public admob: AdMob

  ) { }

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
  DeleteRecord(id) {
    this.firestore.doc('/AirtimeVRecords/' + id).delete();
  }

  showBannerAd(){
    this.admob.interstitial.load({
      id: {
        // replace with your ad unit IDs
        android: 'ca-app-pub-3782350151456053/8648638836',
        ios: 'test'
      },
    }).then(() => this.admob.interstitial.show());
  }


  async toast(message: string, status: string) {
    const toast = await this.toastr.create({
      message,
      color: status,
      position: 'top',
      duration: 3000
    });
    toast.present();
  } // end of toast

  ionViewWillEnter() {
    setTimeout(() => {
      this.datas = {
        heading: 'Normal text',

      };
    }, 3000);
  }

}

