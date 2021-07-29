import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { JugarPageRoutingModule } from './jugar-routing.module';

import { TranslateModule } from '@ngx-translate/core';

import { JugarPage } from './jugar.page';
import { GooglemapsComponent } from './googlemaps/googlemaps.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    JugarPageRoutingModule,
    TranslateModule
  ],
  declarations: [JugarPage, GooglemapsComponent]
})
export class JugarPageModule {}
