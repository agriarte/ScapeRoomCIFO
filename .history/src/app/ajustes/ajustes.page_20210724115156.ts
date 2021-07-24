import { Component, OnInit } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-ajustes',
  templateUrl: './ajustes.page.html',
  styleUrls: ['./ajustes.page.scss'],
})
export class AjustesPage implements OnInit {
  idiomas: string[] = [];
  idiomaDefecto: string;

  darkMode = true;

  constructor(
    private translateService: TranslateService,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializarDarkMode();
  }

  initializarDarkMode(){
    this.platform.ready().then(() =&amp;amp;amp;amp;gt; {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.cambiarDarkMode();
       });
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

  cambiarDarkMode() {
    console.log('darkmode');
    this.darkMode = !this.darkMode;
    document.body.classList.toggle('dark');
  }
}
