import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-success-fundraising',
  templateUrl: './success-fundraising.page.html',
  styleUrls: ['./success-fundraising.page.scss'],
})
export class SuccessFundraisingPage implements OnInit {

  constructor(
    private router: Router,
  ) { }

  goHome() {
    this.router.navigate(['/tabs/home']);
  }


  ngOnInit() {
  }

}
