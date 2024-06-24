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
import {  FundraiserRequestService } from '../../../services/fundraiser-request.service';


@Component({
  selector: 'app-fundraiser-req-info',
  templateUrl: './fundraiser-req-info.page.html',
  styleUrls: ['./fundraiser-req-info.page.scss'],
})
export class FundraiserReqInfoPage implements OnInit {

  validations_form: FormGroup;
  image: any;
  item: any;
  load: boolean = false;

  constructor(
    private imagePicker: ImagePicker,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    private formBuilder: FormBuilder,
    private  fundraiserRequestService:  FundraiserRequestService,
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
      fundraising: new FormControl(this.item.fundraising, Validators.required),
      money: new FormControl(this.item.money, Validators.required),
      story: new FormControl(this.item.story, Validators.required),
      dob: new FormControl(this.item.dob, Validators.required),
      bankAccount: new FormControl(this.item.bankAccount, Validators.required),
      bankName: new FormControl(this.item.bankAccount, Validators.required),
      reviewed: new FormControl(this.item.reviewed, Validators.required),
      other: new FormControl(this.item.other, Validators.required),
      live: new FormControl(this.item.live, Validators.required),
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
      fundraising: value.fundraising,
      money: value.money,
      story: value.story,
      dob: value.dob,
      bankAccount: value.bankAccount,
      bankName: value.bankName,
      other: value.other,
      reviewed: value.reviewed,
      live: value.live,
      image: this.image,
    }
    this.fundraiserRequestService.updateTask(this.item.id,data)
    loading.dismiss()
    .then(
      res => {
        this.router.navigate(['/fundraiser-requests']);
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
            this. fundraiserRequestService.deleteTask(this.item.id)
            .then(
              res => {
                this.router.navigate(['/fundraiser-requests']);
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

    this. fundraiserRequestService.uploadImage(image_src, randomId)
    .then(photoURL => {
      this.image = photoURL;
       loading.dismiss();
      toast.present();
    }, err =>{
      console.log(err);
    })
  }

  async presentLoading(loading) {
    return await loading.present();
  }

}
