import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'app-gmaps',
  templateUrl: './gmaps.component.html',
  styleUrls: ['./gmaps.component.scss'],
})
export class GmapsComponent implements OnInit {

  //parecido a getElementbyId. En la vista HTML se refiere a #map no al id.
  @ViewChild('map', { static: true }) mapElement: ElementRef;

  //si no reconoce google declararla previamente
  declare const google;



  map: any;
  miMarker: any; // marker con mi ubicacion

  miLatitud1: any;
  miLongitud1: any;
  miAltitud1: any;

  miLatitud2: any;
  miLongitud2: any;

  constructor(private geolocation: Geolocation) { }

  ngOnInit() {
    //se esperan coordenadas de geolocation y cuando llegan se inicia escucha de watchPosition
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
  }

  loadMap(coordenadas: any) {
    const latLng = new google.maps.LatLng(
      coordenadas.latitud,
      coordenadas.longitud
    );
    const mapOptions = {
      center: latLng,
      zoom: 12,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
    };
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    this.addMarker(this.map);
  }

  //marcador con la ubicación actual
  addMarker(map: any) {
    const svgMarker = {
      // eslint-disable-next-line max-len
      path: 'M10.453 14.016l6.563-6.609-1.406-1.406-5.156 5.203-2.063-2.109-1.406 1.406zM12 2.016q2.906 0 4.945 2.039t2.039 4.945q0 1.453-0.727 3.328t-1.758 3.516-2.039 3.070-1.711 2.273l-0.75 0.797q-0.281-0.328-0.75-0.867t-1.688-2.156-2.133-3.141-1.664-3.445-0.75-3.375q0-2.906 2.039-4.945t4.945-2.039z',
      fillColor: 'blue',
      fillOpacity: 0.6,
      strokeWeight: 0,
      rotation: 0,
      scale: 2,
      anchor: new google.maps.Point(15, 30),
    };
    this.miMarker = new google.maps.Marker({
      map,
      animation: google.maps.Animation.DROP,
      position: map.getCenter(),
      icon: svgMarker
    });
  }
}


