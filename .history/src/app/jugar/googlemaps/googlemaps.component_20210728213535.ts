import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';

//si no reconoce google declararla previamente
declare const google;

@Component({
  selector: 'app-googlemaps',
  templateUrl: './googlemaps.component.html',
  styleUrls: ['./googlemaps.component.scss'],
})
export class GooglemapsComponent implements OnInit {

  //parecido a getElementbyId. En la vista HTML se refiere a #map no al id.
  @ViewChild('map', { static: true }) mapElement: ElementRef;

  map: any;
  miMarker: any; // marker con mi ubicacion

  miLatitud1: any;
  miLongitud1: any;

  constructor(private geolocation: Geolocation) { }

  ngOnInit() {
    //se esperan coordenadas de geolocation y cuando llegan se inicia escucha de watchPosition
    this.getCoordenadas();
  }

  getCoordenadas() {
    this.geolocation.getCurrentPosition().then((resp) => {

      this.miLatitud1 = resp.coords.latitude;
      this.miLongitud1 = resp.coords.longitude;
      //una vez obtenida posicion, cargar mapa
      this.loadMap();

    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }



  // Initialize and add the map
  loadMap(): void {
    console.log('loadMap');
    //Localización plaza Catalunya
    const plzCatalunya = { lat: 41.38701883110635, lng: 2.1700331467308085 };
    //
    const map = new google.maps.Map(
      document.getElementById('map') as HTMLElement,
      {
        zoom: 18,
        center: plzCatalunya,
      }
    );

    // marcador, plaza catalunya
    const marker = new google.maps.Marker({
      position: plzCatalunya,
      map: map,
    });
  }

  // ubicacion Portal del Angel
  // 41.38680588280507, 2.171534459792433

  // fuente de Santa Anna
  // 41.384590172142566, 2.174188480755004

}

