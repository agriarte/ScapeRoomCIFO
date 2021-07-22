import { Component, OnInit } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-ajustes',
  templateUrl: './ajustes.page.html',
  styleUrls: ['./ajustes.page.scss'],
})
export class AjustesPage implements OnInit {
  idiomas: string[] = [];

  constructor(private translateService: TranslateService) {
  }

  ngOnInit() {
    this.idiomas = this.translateService.getLangs();
    console.log('init: ' + this.idiomas);

  }

  cambiarIdioma(event) {
    this.translateService.use(event.detail.value);
    console.log(event.detail.value);
  }

}
