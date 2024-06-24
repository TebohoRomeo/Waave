/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/type-annotation-spacing */
/* eslint-disable space-before-function-paren */
/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable prefer-const */
/* eslint-disable prefer-arrow/prefer-arrow-functions */
/* eslint-disable @typescript-eslint/semi */
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from "firebase/app";
import "firebase/storage";


@Injectable({
  providedIn: 'root'
})
export class FundraiserRequestService {

  private snapshotChangesSubscription: any;

  constructor(
    private firestore: AngularFirestore,
    private afauth: AngularFireAuth,
  ) { }

  getTasks() {
    return new Promise<any>((resolve, reject) => {
      this.afauth.user.subscribe(user => {
        if (user) {
          this.snapshotChangesSubscription = this.firestore.collection('RequestFundraiser').snapshotChanges();
          resolve(this.snapshotChangesSubscription);
        }
      })
    })
  }

  getTask(taskId) {
    return new Promise<any>((resolve, reject) => {
      this.afauth.user.subscribe(user => {
        if (user) {
          this.snapshotChangesSubscription = this.firestore.doc<any>('RequestFundraiser/' + taskId).valueChanges()
            .subscribe(snapshots => {
              resolve(snapshots);
            }, err => {
              reject(err)
            })
        }
      })
    });
  }


  updateTask(taskKey, value) {
    return new Promise<any>((resolve, reject) => {
      this.firestore
        .collection('RequestFundraiser')
        .doc(taskKey).set(value)
        .then(
          res => resolve(res),
          err => reject(err)
        )
    })
  }

  deleteTask(taskKey) {
    return new Promise<any>((resolve, reject) => {
      this.firestore
        .collection('RequestFundraiser').doc(taskKey).delete()
        .then(
          res => resolve(res),
          err => reject(err)
        )
    })
  }

  createTask(value) {
    return new Promise<any>((resolve, reject) => {
      this.firestore
        .collection('RequestFundraiser').add({
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
          image: value.image
        })
        .then(
          res => resolve(res),
          err => reject(err)
        )
    })
  }

  encodeImageUri(imageUri, callback) {
    var c = document.createElement('canvas');
    var ctx = c.getContext("2d");
    var img = new Image();
    img.onload = function () {
      var aux: any = this;
      c.width = aux.width;
      c.height = aux.height;
      ctx.drawImage(img, 0, 0);
      var dataURL = c.toDataURL("image/jpeg");
      callback(dataURL);
    };
    img.src = imageUri;
  };

  uploadImage(imageURI, randomId) {
    return new Promise<any>((resolve, reject) => {
      let storageRef = firebase.storage().ref();
      let imageRef = storageRef.child('Fundraiser-Request-images').child(randomId);
      this.encodeImageUri(imageURI, function (image64) {
        imageRef.putString(image64, 'data_url')
          .then(snapshot => {
            snapshot.ref.getDownloadURL()
              .then(res => resolve(res))
          }, err => {
            reject(err);
          })
      })
    })
  }
}
