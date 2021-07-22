import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private translateService: TranslateService) {
    //fijar idioma por defecto
    //spanish es el nombre del archivo json
    this.translateService.setDefaultLang('spanish');
  }
}
