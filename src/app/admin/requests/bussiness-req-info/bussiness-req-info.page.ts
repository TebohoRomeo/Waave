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
import { BussinessRequestService } from '../../../services/bussiness-request.service';

@Component({
  selector: 'app-bussiness-req-info',
  templateUrl: './bussiness-req-info.page.html',
  styleUrls: ['./bussiness-req-info.page.scss'],
})
export class BussinessReqInfoPage implements OnInit {

  validations_form: FormGroup;
  image: any;
  item: any;
  load: boolean = false;
  productOne: any;
  productTwo: any;
  producthree: any;
  productfour: any;

  constructor(
    private imagePicker: ImagePicker,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    private formBuilder: FormBuilder,
    private bussinessRequestService: BussinessRequestService,
    private webview: WebView,
    private alertCtrl: AlertController,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.getData();
  }

  getData(){
    this.route.data.subscribe(routeData => {
     let data = routeData['data'];
     if (data) {
       this.item = data;
       this.image = this.item.image;
       this.productOne= this.item.productOne;
       this.productTwo= this.item.productTwo;
       this.producthree = this.item.producthree;
       this.productfour = this.item.productfour;
     }
    })
    this.validations_form = this.formBuilder.group({
      name: new FormControl(this.item.name, Validators.required),
      lastName: new FormControl(this.item.lastName, Validators.required),
      email: new FormControl(this.item.email, Validators.required),
      phone: new FormControl(this.item.phone, Validators.required),
      address: new FormControl(this.item.address, Validators.required),
      postal: new FormControl(this.item.postal, Validators.required),
      city: new FormControl(this.item.city, Validators.required),
      country: new FormControl(this.item.country, Validators.required),
      website: new FormControl(this.item.website, Validators.required),
      companyName: new FormControl(this.item.companyName, Validators.required),
      aboutCompany: new FormControl(this.item.aboutCompany, Validators.required),
      bphone: new FormControl(this.item.bphone, Validators.required),
      bemail: new FormControl(this.item.bemail, Validators.required),
      reviewed: new FormControl(this.item.rewiewed, Validators.required),
      paid: new FormControl(this.item.paid, Validators.required),
      live: new FormControl(this.item.live, Validators.required),
      wapp: new FormControl(this.item.wapp),
    });
  }

 async onSubmit(value){
  const loading = await this.loadingCtrl.create({
    message: 'Please wait...'
  });
    let data = {
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
      reviewed: value.reviewed,
      wapp: value.wapp,
      paid: value.paid,
      live: value.live,
      image: this.image,
      productOne: this.productOne,
      productTwo: this.productTwo,
      producthree: this.producthree,
      productfour: this.productfour,
    }
    this.bussinessRequestService.updateTask(this.item.id,data)
    loading.dismiss()
    .then(
      res => {
        this.router.navigate(['/bussiness-requests']);
      }
    )
  }

  async delete() {
    const alert = await this.alertCtrl.create({
      header: 'Confirm',
      message: 'Do you want to delete ' + this.item.name + '?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {}
        },
        {
          text: 'Yes',
          handler: () => {
            this.bussinessRequestService.deleteTask(this.item.id)
            .then(
              res => {
                this.router.navigate(['/bussiness-requests']);
              },
              err => console.log(err)
            )
          }
        }
      ]
    });
    await alert.present();
  }

  openImagePicker(){
    this.imagePicker.hasReadPermission()
    .then((result) => {
      if(result == false){
        this.imagePicker.requestReadPermission();
      }
      else if(result == true){
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

  async uploadImageToFirebase(image){
    const loading = await this.loadingCtrl.create({
      message: 'Please wait...'
    });
    const toast = await this.toastCtrl.create({
      message: 'Image was uploaded successfully',
      duration: 3000,
      color: 'success'
    });
    let image_src = this.webview.convertFileSrc(image);
    let randomId = Math.random().toString(36).substr(2, 5);

    this.bussinessRequestService.uploadImage(image_src, randomId)
    .then(photoURL => {
      this.image = photoURL;
       loading.dismiss();
      toast.present();
    }, err =>{
      console.log(err);
    })
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

}
