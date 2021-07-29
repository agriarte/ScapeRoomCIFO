import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-jugar',
  templateUrl: './jugar.page.html',
  styleUrls: ['./jugar.page.scss'],
})
export class JugarPage implements OnInit {

  constructor(private authSvc: AuthService, private router: Router) { }

  ngOnInit() {
  }

  logout(){
    this.authSvc.logout();
    this.router.navigate(['/home']);
  }
}
