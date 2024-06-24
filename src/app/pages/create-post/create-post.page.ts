/* eslint-disable @typescript-eslint/prefer-for-of */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  AlertController,
  LoadingController,
  ToastController,
  ModalController,
} from '@ionic/angular';
import { FundraiserRequestService  } from '../../services/fundraiser-request.service';
import {
  Validators,
  FormBuilder,
  FormGroup,
} from '@angular/forms';
import { ImagePicker } from '@awesome-cordova-plugins/image-picker/ngx';
import { WebView } from '@awesome-cordova-plugins/ionic-webview/ngx';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.page.html',
  styleUrls: ['./create-post.page.scss'],
})
export class CreatePostPage implements OnInit {
  form: FormGroup;
  submitted = false;
  image: any;

  imageResponse: any;
  options: any;

  constructor(
    private router: Router,
    private toastr: ToastController,
    private imagePicker: ImagePicker,
    public toastCtrl: ToastController,
    public modalCtrl: ModalController,
    public loadingCtrl: LoadingController,
    private fb: FormBuilder,
    private fundraiserRequestService: FundraiserRequestService ,
    private webview: WebView,
    public alertController: AlertController
  ) { }

  ngOnInit() {
    this.resetFields();
  }

  resetFields() {
    this.image = '../../../assets/icon/IMG_20171127_114101.png';
    this.form = this.fb.group({
      name: [null, [Validators.required, Validators.minLength(3)]],
      lastName: [null, [Validators.required, Validators.minLength(3)]],
      email: [null, [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      phone: [null, [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('^[0-9]+$')]],
      address: [null, [Validators.required, Validators.minLength(5)]],
      postal: [null, [Validators.required, Validators.maxLength(2), Validators.pattern('^[0-9]+$')]],
      city: [null, [Validators.required, Validators.minLength(5)]],
      country: [null, [Validators.required, Validators.minLength(5)]],
      fundraising: [null, [Validators.required, Validators.minLength(5)]],
      money: [null, [Validators.required, Validators.minLength(5), Validators.maxLength(10), Validators.pattern('^[0-9]+$')]],
      story: [null, [Validators.required, Validators.minLength(100), Validators.maxLength(250)]],
      dob: [null, [Validators.required]],
      province: [null, [Validators.required]],
      bankAccount: [null, [Validators.required]],
      bankName: [null, [Validators.required]],
      other: [null, ],
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
      province: value.province,
      fundraising: value.fundraising,
      money: value. money,
      story: value.story,
      dob: value.dob,
      bankAccount: value.bankAccount,
      bankName: value.bankName,
      other: value.other,
      image: this.image,
    };
    this.fundraiserRequestService.createTask(data).then((res) => {
      this.router.navigate(['/success-fundraising']);
      this.toast('Submitted for review. ', 'success');
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
    this.fundraiserRequestService.uploadImage(image_src, randomId).then(
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
      duration: 2000,
    });
    toast.present();
  }

  async closeModal(){
    this.modalCtrl.dismiss();
  }
}



