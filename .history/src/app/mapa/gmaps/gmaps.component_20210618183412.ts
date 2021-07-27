import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'app-gmaps',
  templateUrl: './gmaps.component.html',
  styleUrls: ['./gmaps.component.scss'],
})
export class GmapsComponent implements OnInit {

miLatitud1: any;
miLongitud1: any;
miAltitud1: any;

miLatitud2: any;
miLongitud2: any;

  constructor(private geolocation: Geolocation) { }

  ngOnInit() {
    this.getCoordenadas();
  }

  getCoordenadas() {
    this.geolocation.getCurrentPosition().then((resp) => {
      // resp.coords.latitude
      // resp.coords.longitude
      this.miLatitud1 = resp.coords.latitude;
      this.miLongitud1 = resp.coords.longitude;
      this.miAltitud1 = resp.coords.altitude;
    }).catch((error) => {
      console.log('Error getting location', error);
    });


    const watch = this.geolocation.watchPosition();
    watch.subscribe((data) => {
      // data can be a set of coordinates, or an error (if an error occurred).

      //*** NO FUNCIONA SEGUN DOCU OFICIAL
      //Property 'coords' does not exist on type 'Geoposition | PositionError'.
      //Property 'coords' does not exist on type 'PositionError'.ts(2339)
       //this.miLatitud2 = data.coords.latitude ;
      // this.miLatitud2 = data.coords.longitude;
    });
  }

}
