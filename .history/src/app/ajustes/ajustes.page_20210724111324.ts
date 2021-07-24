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

  constructor(private translateService: TranslateService) {
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

  onDarkMode(event){
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)');
    systemDark.addListener(this.colorTest);
    if(event.detail.checked){
      document.body.setAttribute('data-theme', 'dark');
    }
    else{
      document.body.setAttribute('data-theme', 'light');
    }
  }

   colorTest(systemInitiatedDark) {
    if (systemInitiatedDark.matches) {
      document.body.setAttribute('data-theme', 'dark');
    } else {
      document.body.setAttribute('data-theme', 'light');
    }
  }
}
