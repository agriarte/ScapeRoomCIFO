import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/authentication.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  isLogged = false;
  constructor(
    private router: Router,
    private authSvc: AuthService,
    private toastCtrl: ToastController
  ) {}

  async onLogin(email, password) {
    try {
      const user = await this.authSvc.login(email.value, password.value);
      if (user) {
        const isVerified = this.authSvc.isEmailVerified(user);
        this.redirectUser(isVerified);
        this.isLogged = true;
        console.log({ isVerified });
        console.log('User: ', user);
      }
    } catch (error) {
      this.isLogged = false;
      console.log('Error: ', error);
    }
  }

  async onLoginGoogle() {
    try {
      const user = await this.authSvc.loginGoogle();
      if (user) {
        const isVerified = this.authSvc.isEmailVerified(user);
        this.redirectUser(isVerified);
        console.log({ isVerified });
        console.log('User: ', user);
      }
    } catch (error) {
      console.log('Error: ', error);
    }
  }

  async mensajeLoginError() {
    const toast = await this.toastCtrl.create({
      message: 'NOT A VALID GOOGLE ACCOUNT',
      position: 'middle',
      color: 'warning',
      duration: 2000,
    });
    toast.present();
  }

  private redirectUser(isVerified: boolean): void {
    if (isVerified) {
      this.router.navigate(['mapa']);
    } else {
      //this.router.navigate(['verify-email']);
      this.mensajeLoginError();
    }
  }
}
