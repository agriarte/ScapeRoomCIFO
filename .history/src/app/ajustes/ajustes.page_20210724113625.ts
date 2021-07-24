import { Component, OnInit } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-ajustes',
  templateUrl: './ajustes.page.html',
  styleUrls: ['./ajustes.page.scss'],
})
export class AjustesPage implements OnInit {
  idiomas: string[] = [];
  idiomaDefecto: string;

  darkMode = true;

  constructor(private translateService: TranslateService) {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    this.darkMode = prefersDark.matches;
  }

  ngOnInit() {
    this.idiomas = this.translateService.getLangs();
    this.idiomaDefecto = this.translateService.getDefaultLang();
    console.log('init: ' + this.idiomas);

  }

  cambiarIdioma(event) {
    this.translateService.use(event.detail.value);
    console.log('cambiar idioma: ' + event.detail.value);
  }

  onDarkMode(event) {
    console.log('darkmode');
  }
}
