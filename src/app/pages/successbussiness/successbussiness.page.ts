import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-successbussiness',
  templateUrl: './successbussiness.page.html',
  styleUrls: ['./successbussiness.page.scss'],
})
export class SuccessbussinessPage implements OnInit {

  constructor(
    private router: Router,
  ) { }

  goHome() {
    this.router.navigate(['/tabs/bussiness']);
  }

  ngOnInit() {
  }

}
