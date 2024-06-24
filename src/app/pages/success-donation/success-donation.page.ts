import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-success-donation',
  templateUrl: './success-donation.page.html',
  styleUrls: ['./success-donation.page.scss'],
})
export class SuccessDonationPage implements OnInit {
  constructor(private router: Router) {}

  goHome() {
    this.router.navigate(['/tabs/home']);
  }

  ngOnInit() {}
}
