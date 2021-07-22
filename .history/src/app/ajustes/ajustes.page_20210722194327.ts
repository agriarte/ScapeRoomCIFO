import { Component, OnInit } from '@angular/core';

import {  TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-ajustes',
  templateUrl: './ajustes.page.html',
  styleUrls: ['./ajustes.page.scss'],
})
export class AjustesPage implements OnInit {
  idiomas: string [] = [];

  constructor(translateService: TranslateService) {
    this.idiomas = this.translateService.getLangs;
   }

  ngOnInit() {
  }

}
