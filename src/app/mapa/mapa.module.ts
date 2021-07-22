import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MapaPageRoutingModule } from './mapa-routing.module';
import { TranslateModule } from '@ngx-translate/core';

import { MapaPage } from './mapa.page';
import { GmapsComponent } from './gmaps/gmaps.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MapaPageRoutingModule,
    TranslateModule
  ],
  declarations: [MapaPage, GmapsComponent]
})
export class MapaPageModule {}
