/* eslint-disable @typescript-eslint/prefer-for-of */
/* eslint-disable @typescript-eslint/naming-convention */

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  AlertController,
  LoadingController,
  ToastController,
} from '@ionic/angular';
import { FirebaseService } from '../../../services/firebase.service';
import {
  Validators,
  FormBuilder,
  FormGroup,
  FormControl,
} from '@angular/forms';
import { ImagePicker } from '@awesome-cordova-plugins/image-picker/ngx';
import { WebView } from '@awesome-cordova-plugins/ionic-webview/ngx';

@Component({
  selector: 'app-fundraiser-uploader',
  templateUrl: './fundraiser-uploader.page.html',
  styleUrls: ['./fundraiser-uploader.page.scss'],
})
export class FundraiserUploaderPage implements OnInit {
  form: FormGroup;
  submitted = false;

  validations_form: FormGroup;
  image: any;

  imageResponse: any;
  options: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastController,
    private imagePicker: ImagePicker,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    private formBuilder: FormBuilder,
    private firebaseService: FirebaseService,
    private webview: WebView,
    public alertController: AlertController
  ) { }

  ngOnInit() {
    this.resetFields();
  }

  resetFields() {
    this.image = '../../../assets/icon/IMG_20171127_114101.png';
    this.validations_form = this.formBuilder.group({
      receiverName: new FormControl('', Validators.required),
      targetAmount: new FormControl('', Validators.required),
      raisedAmount: new FormControl('', Validators.required),
      references: new FormControl('', Validators.required),
      endingDAte: new FormControl('', Validators.required),
      benefactors: new FormControl('', Validators.required),
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      bankName: new FormControl('', Validators.required),
      bankAccount: new FormControl('', Validators.required),
    });
  }

  async onSubmit(value) {
    this.toast('Uploading please wait', 'warning');
    const data = {
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
    };
    this.firebaseService.createTask(data).then((res) => {
      this.router.navigate(['tabs/home']);
    });
  }

  openImagePicker() {
    this.imagePicker.hasReadPermission().then(
      (result) => {
        if (result === false) {
          // no callbacks required as this opens a popup which returns async
          this.imagePicker.requestReadPermission();
        } else if (result === true) {
          this.imagePicker
            .getPictures({
              maximumImagesCount: 1,
            })
            .then(
              (results) => {
                for (let i = 0; i < results.length; i++) {
                  this.uploadImageToFirebase(results[i]);
                }
              },
              (err) => console.log(err)
            );
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  async uploadImageToFirebase(image) {
    const loading = await this.loadingCtrl.create({
      message: 'Please wait...',
    });
    const toast = await this.toastCtrl.create({
      message: 'Image was uploaded successfully',
      duration: 3000,
      color: 'success'
    });
    this.presentLoading(loading);
    const image_src = this.webview.convertFileSrc(image);
    const randomId = Math.random().toString(36).substr(2, 5);

    //uploads img to firebase storage
    this.firebaseService.uploadImage(image_src, randomId).then(
      (photoURL) => {
        this.image = photoURL;
        loading.dismiss();
        toast.present();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  async presentLoading(loading) {
    return await loading.present();
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
