import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  constructor(private router: Router, private authSvc: AuthService) {}


  async onLogin(email, password) {
    try {
      const user = await this.authSvc.login(email.value, password.value);
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

  private redirectUser(isVerified: boolean): void {
    if (isVerified) {
      this.router.navigate(['jugar']);
    } else {
      this.router.navigate(['verify-email']);
    }
  }
}
