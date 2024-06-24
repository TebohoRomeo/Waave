/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/semi */
import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-amount-raised',
  templateUrl: './amount-raised.component.html',
  styleUrls: ['./amount-raised.component.scss'],
})
export class AmountRaisedComponent implements OnInit {
  form: FormGroup;
  submitted = false;

  @Input() id: string;
  @Input() story: string;
  @Input() amount: number;

  constructor(
    private firestore: AngularFirestore,
    private modalController: ModalController,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      story: [null, [Validators.required]],
      amount: [null, [Validators.required]],
    });
  }

  saveDetails() {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }
    this.submitted = false;
    this.form.reset();
  }

  ngOnInit() {}

  UpdateRecord( story, amount) {
    let updaterecord = {};
      (updaterecord['story'] = story),
      (updaterecord['amount'] = amount),
      this.firestore
        .doc('/RaisedCash/' + this.id)
        .update(updaterecord)
        .then(() => {
          this.modalController.dismiss();
        });
  }

  CloseModal() {
    this.modalController.dismiss();
  }
}
