/* eslint-disable @typescript-eslint/prefer-for-of */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  AlertController,
  LoadingController,
  ToastController,
} from '@ionic/angular';
import { BussinessRequestService } from '../../services/bussiness-request.service';
import {
  Validators,
  FormBuilder,
  FormGroup,
} from '@angular/forms';
import { ImagePicker } from '@awesome-cordova-plugins/image-picker/ngx';
import { WebView } from '@awesome-cordova-plugins/ionic-webview/ngx';
@Component({
  selector: 'app-upload-bussiness',
  templateUrl: './upload-bussiness.page.html',
  styleUrls: ['./upload-bussiness.page.scss'],
})
export class UploadBussinessPage implements OnInit {
  form: FormGroup;
  submitted = false;
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
    private fb: FormBuilder,
    private bussinessRequestService: BussinessRequestService,
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
    this.form = this.fb.group({
      name: [null, [Validators.required, Validators.minLength(3)]],
      lastName: [null, [Validators.required, Validators.minLength(3)]],
      bemail: [null, [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      email: [null, [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      phone: [null, [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('^[0-9]+$')]],
      address: [null, [Validators.required, Validators.minLength(4)]],
      postal: [null, [Validators.required, Validators.maxLength(4), Validators.pattern('^[0-9]+$')]],
      city: [null, [Validators.required, Validators.minLength(3)]],
      country: [null, [Validators.required, Validators.minLength(5)]],
      website: [null, [Validators.required, Validators.minLength(2)]],
      companyName: [null, [Validators.required]],
      aboutCompany: [null, [Validators.required, Validators.minLength(50), Validators.maxLength(250)]],
      bphone: [null, [Validators.required, Validators.minLength(4)]],
      wapp: [null,],
    });
  }

  async onSubmit(value) {
    const loading = await this.loadingCtrl.create({
      message: 'Please wait...'
    });
    this.presentLoading(loading);
    const data = {
      name: value.name,
      lastName: value.lastName,
      email: value.email,
      phone: value.phone,
      address: value.address,
      postal: value.postal,
      city: value.city,
      country: value.country,
      website: value.website,
      companyName: value.companyName,
      aboutCompany: value.aboutCompany,
      bphone: value.bphone,
      bemail: value.bemail,
      wapp: value.wapp,
      image: this.image,
      productOne: this.productOne,
      productTwo: this.productTwo,
      producthree: this.producthree,
      productfour: this.productfour,
    };
    this.bussinessRequestService.createTask(data).then((res) => {
      this.router.navigate(['/payment']);
      this.toast('Pay the fee for your application to be considered ', 'success');
    });
    loading.dismiss();
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
    this.bussinessRequestService.uploadImage(image_src, randomId).then(
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
    this.bussinessRequestService.uploadImage(image_src, randomId).then(
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
    this.bussinessRequestService.uploadImage(image_src, randomId).then(
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
    this.bussinessRequestService.uploadImage(image_src, randomId).then(
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
    this.bussinessRequestService.uploadImage(image_src, randomId).then(
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
      duration: 5000,
    });
    toast.present();
  }
}


