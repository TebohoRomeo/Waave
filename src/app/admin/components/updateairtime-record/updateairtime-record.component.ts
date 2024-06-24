/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/semi */
import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController} from '@ionic/angular';

@Component({
  selector: 'app-updateairtime-record',
  templateUrl: './updateairtime-record.component.html',
  styleUrls: ['./updateairtime-record.component.scss'],
})
export class UpdateairtimeRecordComponent implements OnInit {
  form: FormGroup;
  submitted = false;

  @Input() id: string;
  @Input() type: string;
  @Input() airtimeTpye: string;
  @Input() voucherType: string;
  @Input() voucherCode: number;
  @Input() timeUpdate: string;

  constructor(
    private firestore: AngularFirestore,
    private modalController: ModalController,
    private fb: FormBuilder,
  ) {
    this.form = this.fb.group({
      airtimeNetwork: [null, [Validators.required, Validators.minLength(3)]],
      prepaidVoucher: [null, [Validators.required, Validators.minLength(3)]],
      voucherNumber: [null, [Validators.required]],
      timeUpdates: [null, [Validators.required]],
    });
  }


  saveDetails() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }
    this.submitted = false;
    this.form.reset();
  }

  ngOnInit() {

  }

  UpdateRecord(type, airtimeTpye, voucherType, voucherCode, timeUpdate) {
    let updaterecord = {}
    updaterecord['type'] = type,
      updaterecord['airtimeTpye'] = airtimeTpye,
      updaterecord['voucherType'] = voucherType,
      updaterecord['voucherCode'] = voucherCode,
      updaterecord['timeUpdate'] = timeUpdate,

      this.firestore.doc('/AirtimeVRecords/' + this.id).update(updaterecord).then(() => {
        this.modalController.dismiss()
      })
  }

  CloseModal() {
    this.modalController.dismiss()
  }

}
