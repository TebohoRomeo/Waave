/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable eqeqeq */
/* eslint-disable @typescript-eslint/prefer-for-of */
/* eslint-disable @typescript-eslint/semi */
/* eslint-disable prefer-const */
/* eslint-disable no-var */

import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { LoadingController, ToastController, AlertController } from '@ionic/angular';
import { ImagePicker } from '@awesome-cordova-plugins/image-picker/ngx';
import { WebView } from '@awesome-cordova-plugins/ionic-webview/ngx';
import { ActivatedRoute, Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';


@Component({
  selector: 'app-fundraiser-upload-edit',
  templateUrl: './fundraiser-upload-edit.page.html',
  styleUrls: ['./fundraiser-upload-edit.page.scss'],
})
export class FundraiserUploadEditPage implements OnInit {

  validations_form: FormGroup;
  image: any;
  item: any;
  load: boolean = false;
  name: any;
  website: any;
  aboutCompany: any;
  call: any;
  email: any;
  location: any;

  constructor(
    private imagePicker: ImagePicker,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    private formBuilder: FormBuilder,
    private firebaseService: FirebaseService,
    private webview: WebView,
    private alertCtrl: AlertController,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.route.data.subscribe(routeData => {
      let data = routeData['data'];
      if (data) {
        this.item = data;
        this.image = this.item.image;
      }
    })
    this.validations_form = this.formBuilder.group({
      receiverName: new FormControl(this.item.receiverName, Validators.required),
      targetAmount: new FormControl(this.item.targetAmount, Validators.required),
      raisedAmount: new FormControl(this.item.raisedAmount, Validators.required),
      references: new FormControl(this.item.references, Validators.required),
      endingDAte: new FormControl(this.item.endingDAte, Validators.required),
      benefactors: new FormControl(this.item.benefactors, Validators.required),
      title: new FormControl(this.item.title, Validators.required),
      bankName: new FormControl(this.item.bankName, Validators.required),
      bankAccount: new FormControl(this.item.bankAccount, Validators.required),
      description: new FormControl(this.item.description, Validators.required),
    });
  }

  async onSubmit(value) {
    const loading = await this.loadingCtrl.create({
      message: 'Please wait...'
    });
    let data = {
      receiverName: value.receiverName,
      targetAmount: value.targetAmount,
      raisedAmount: value.raisedAmount,
      references: value.references,
      endingDAte: value.endingDAte,
      benefactors: value.benefactors,
      title: value.title,
      description: value.description,
      bankName: value.bankName,
      bankAccount: value.bankAccount,
      image: this.image
    }
    this.firebaseService.updateTask(this.item.id, data)
    loading.dismiss()
      .then(
        res => {
          this.router.navigate(['/fundraiser-upload-history']);
        }
      )
  }

  async delete() {
    const alert = await this.alertCtrl.create({
      header: 'Confirm',
      message: 'Do you want to delete ' + this.item.receiverName + '?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => { }
        },
        {
          text: 'Yes',
          handler: () => {
            this.firebaseService.deleteTask(this.item.id)
              .then(
                res => {
                  this.router.navigate(['/fundraiser-upload-history']);
                },
                err => console.log(err)
              )
          }
        }
      ]
    });
    await alert.present();
  }

  openImagePicker() {
    this.imagePicker.hasReadPermission()
      .then((result) => {
        if (result == false) {
          this.imagePicker.requestReadPermission();
        }
        else if (result == true) {
          this.imagePicker.getPictures({
            maximumImagesCount: 1
          }).then(
            (results) => {
              for (var i = 0; i < results.length; i++) {
                this.uploadImageToFirebase(results[i]);
              }
            }, (err) => console.log(err)
          );
        }
      }, (err) => {
        console.log(err);
      });
  }

  async uploadImageToFirebase(image) {
    const loading = await this.loadingCtrl.create({
      message: 'Please wait...'
    });
    const toast = await this.toastCtrl.create({
      message: 'Image was uploaded successfully',
      duration: 3000
    });
    let image_src = this.webview.convertFileSrc(image);
    let randomId = Math.random().toString(36).substr(2, 5);

    this.firebaseService.uploadImage(image_src, randomId)
      .then(photoURL => {
        this.image = photoURL;
        loading.dismiss();
        toast.present();
      }, err => {
        console.log(err);
      })
  }

  async presentLoading(loading) {
    return await loading.present();
  }

}
