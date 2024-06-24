import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {
  constructor(private router: Router) {}

  goToUplAirtime() {
    this.router.navigate(['airtime-uploader']);
  }

  goToViewAirtime() {
    this.router.navigate(['airtime-upload-history']);
  }

  goToUplBussiness() {
    this.router.navigate(['bussiness-uploader']);
  }

  goToViewBussiness() {
    this.router.navigate(['bussiness-upload-history']);
  }

  goToUplFund() {
    this.router.navigate(['fundraiser-uploader']);
  }

  goToViewFund() {
    this.router.navigate(['fundraiser-upload-history']);
  }

  goToUplUpdates() {
    this.router.navigate(['updates-uploader']);
  }

  goToViewUpdates(){
    this.router.navigate(['updates-history']);
  }

  goToBreq() {
    this.router.navigate(['bussiness-requests']);
  }

  goToFreq() {
    this.router.navigate(['fundraiser-requests']);
  }

  goToraisedcash(){
    this.router.navigate(['amount-raised']);
  }

  goToraisedcashedit(){
    this.router.navigate(['amount-raised-info']);
  }
  ngOnInit() {}
}
