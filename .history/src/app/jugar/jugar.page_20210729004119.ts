/* eslint-disable max-len */
import { AuthService } from '../services/authentication.service';
import { Router } from '@angular/router';

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-jugar',
  templateUrl: './jugar.page.html',
  styleUrls: ['./jugar.page.scss'],
})
export class JugarPage implements OnInit, OnDestroy {

  public dateNow: any;

  public dDay: any;

  milliSecondsInASecond = 1000;
  hoursInADay = 24;
  minutesInAnHour = 60;
  secondsInAMinute = 60;

  public timeDifference;
  public secondsToDday;
  public minutesToDday;
  public hoursToDday;
  public daysToDday;

  private subscription: Subscription;



  constructor(private authSvc: AuthService, private router: Router) { }


  ngOnInit() { }

  comenzarJuego() {
    this.iniciarTemporizador();
  }

  iniciarTemporizador() {
    this.dateNow = new Date();
    this.dDay = this.dateNow;
    this.subscription = interval(1000)
      .subscribe(x => { this.getTimeDifference(); });

    this.dDay.setMinutes(this.dDay.getMinutes() + 90);

    console.log('destino: ' + this.dDay);
    console.log(this.dateNow);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  logout() {
    this.authSvc.logout();
    this.router.navigate(['/home']);
  }


  private getTimeDifference() {
    this.timeDifference = this.dDay.getTime() - new Date().getTime();
    this.allocateTimeUnits(this.timeDifference);
  }

  private allocateTimeUnits(timeDifference) {
    this.secondsToDday = Math.floor((timeDifference) / (this.milliSecondsInASecond) % this.secondsInAMinute);
    this.minutesToDday = Math.floor((timeDifference) / (this.milliSecondsInASecond * this.minutesInAnHour) % this.secondsInAMinute);
    this.hoursToDday = Math.floor((timeDifference) / (this.milliSecondsInASecond * this.minutesInAnHour * this.secondsInAMinute) % this.hoursInADay);
    this.daysToDday = Math.floor((timeDifference) / (this.milliSecondsInASecond * this.minutesInAnHour * this.secondsInAMinute * this.hoursInADay));
  }

}
