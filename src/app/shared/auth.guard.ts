import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private authSvc: AuthService,
    private router: Router,
    private toastCtrl: ToastController
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.authSvc.user$.pipe(
      take(1),
      map((user) => {
        console.log('user: ', user);
        if (user) {
          return true;
        } else {
          //redirect to login
          this.authSvc.errorLoggedOff();
          this.router.navigate(['/home']);
          return false;
        }
      })
    );
  }
}
