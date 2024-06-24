/* eslint-disable @typescript-eslint/prefer-for-of */
/* eslint-disable @typescript-eslint/naming-convention */

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  AlertController,
  LoadingController,
  ToastController,
} from '@ionic/angular';
import { BussinessService } from '../../../services/bussiness.service';
import {
  Validators,
  FormBuilder,
  FormGroup,
  FormControl,
} from '@angular/forms';
import { ImagePicker } from '@awesome-cordova-plugins/image-picker/ngx';
import { WebView } from '@awesome-cordova-plugins/ionic-webview/ngx';

@Component({
  selector: 'app-bussiness-uploader',
  templateUrl: './bussiness-uploader.page.html',
  styleUrls: ['./bussiness-uploader.page.scss'],
})
export class BussinessUploaderPage implements OnInit {
  form: FormGroup;
  submitted = false;

  validations_form: FormGroup;
  image: any;
  productOne: any;
  productTwo: any;
  producthree: any;
  productfour: any;
  imageResponse: any;
  options: any;

  constructor(
    private router: Router,
    private toastr: ToastController,
    private imagePicker: ImagePicker,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    private formBuilder: FormBuilder,
    private bussinessService: BussinessService,
    private webview: WebView,
    public alertController: AlertController
  ) { }

  ngOnInit() {
    this.resetFields();
  }

  resetFields() {
    this.image = '../../../assets/icon/IMG_20171127_114101.png';
    this.productOne = '../../../assets/icon/IMG_20171127_114101.png';
    this.productTwo = '../../../assets/icon/IMG_20171127_114101.png';
    this.producthree = '../../../assets/icon/IMG_20171127_114101.png';
    this.productfour = '../../../assets/icon/IMG_20171127_114101.png';
    this.validations_form = this.formBuilder.group({
      name: new FormControl('', Validators.required),
      website: new FormControl('', Validators.required),
      aboutCompany: new FormControl('', Validators.required),
      location: new FormControl('', Validators.required),
      call: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      summaryAboutCompany: new FormControl('', Validators.required),
      wapp: [null, ],
    });
  }

  async onSubmit(value) {
    const loading = await this.loadingCtrl.create({
      message: 'Please wait...',
    });
    this.presentLoading(loading);
    const data = {
      name: value.name,
      website: value.website,
      aboutCompany: value.aboutCompany,
      summaryAboutCompany: value.summaryAboutCompany,
      location: value.location,
      email: value.email,
      call: value.call,
      wapp: value.wapp,
      image: this.image,
      productOne: this.productOne,
      productTwo: this.productTwo,
      producthree: this.producthree,
      productfour: this.productfour,
    };
    loading.dismiss();
    this.bussinessService.createTask(data).then((res) => {
      this.router.navigate(['/bussiness-upload-history']);
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
    this.bussinessService.uploadImage(image_src, randomId).then(
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

  imageForProductOne() {
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
                  this.uploadImageProductOneFirebase(results[i]);
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

  async uploadImageProductOneFirebase(productOne) {
    const loading = await this.loadingCtrl.create({
      message: 'Please wait...',
    });
    const toast = await this.toastCtrl.create({
      message: 'Image was uploaded successfully',
      duration: 3000,
      color: 'success'
    });
    this.presentLoading(loading);
    const image_src = this.webview.convertFileSrc(productOne);
    const randomId = Math.random().toString(36).substr(2, 5);

    //uploads img to firebase storage
    this.bussinessService.uploadImage(image_src, randomId).then(
      (photoURL) => {
        this.productOne = photoURL;
        loading.dismiss();
        toast.present();
      },
      (err) => {
        console.log(err);
      }
    );
  }


  imageForproductTwo() {
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
                  this.uploadImageProductTwoFirebase(results[i]);
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

  async uploadImageProductTwoFirebase(productTwo) {
    const loading = await this.loadingCtrl.create({
      message: 'Please wait...',
    });
    const toast = await this.toastCtrl.create({
      message: 'Image was uploaded successfully',
      duration: 3000,
      color: 'success'
    });
    this.presentLoading(loading);
    const image_src = this.webview.convertFileSrc(productTwo);
    const randomId = Math.random().toString(36).substr(2, 5);

    //uploads img to firebase storage
    this.bussinessService.uploadImage(image_src, randomId).then(
      (photoURL) => {
        this.productTwo = photoURL;
        loading.dismiss();
        toast.present();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  imageForproducthree() {
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
                  this.uploadImageProductproducthreeFirebase(results[i]);
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

  async uploadImageProductproducthreeFirebase(producthree) {
    const loading = await this.loadingCtrl.create({
      message: 'Please wait...',
    });
    const toast = await this.toastCtrl.create({
      message: 'Image was uploaded successfully',
      duration: 3000,
      color: 'success'
    });
    this.presentLoading(loading);
    const image_src = this.webview.convertFileSrc(producthree);
    const randomId = Math.random().toString(36).substr(2, 5);

    //uploads img to firebase storage
    this.bussinessService.uploadImage(image_src, randomId).then(
      (photoURL) => {
        this.producthree = photoURL;
        loading.dismiss();
        toast.present();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  imageForproductfour() {
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
                  this.uploadImageProductproducproductfourFirebase(results[i]);
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

  async uploadImageProductproducproductfourFirebase(productfour) {
    const loading = await this.loadingCtrl.create({
      message: 'Please wait...',
    });
    const toast = await this.toastCtrl.create({
      message: 'Image was uploaded successfully',
      duration: 3000,
      color: 'success'
    });
    this.presentLoading(loading);
    const image_src = this.webview.convertFileSrc(productfour);
    const randomId = Math.random().toString(36).substr(2, 5);

    //uploads img to firebase storage
    this.bussinessService.uploadImage(image_src, randomId).then(
      (photoURL) => {
        this.productfour = photoURL;
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
