/* eslint-disable @typescript-eslint/naming-convention */
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email: string;
  password: string;

  form: FormGroup;
  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  type: boolean = true;
  submitted = false;

  constructor(
    private toastr: ToastController,
    private auth: AuthService,
    private router: Router,
    private fb: FormBuilder,
  ) {

    this.form = this.fb.group({
      email: [null, [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      password: [null, [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit() {
  }

  login() {
    if (this.email && this.password) {
      this.auth.signIn(this.email, this.password);
    } else {
      this.toast('Please enter your email & password', 'warning');
    }
  }

  forgot() {
    this.router.navigate(['/forgot-password']);
  }

  onLogin() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    // reset form
    {
      this.submitted = false;
      this.form.reset();
    }
  }

  async toast(message: string, status: string) {
    const toast = await this.toastr.create({
      message,
      color: status,
      position: 'top',
      duration: 3000
    });
    toast.present();
  } // end of toast

  changeType() {
    this.type = !this.type;
  }

}
