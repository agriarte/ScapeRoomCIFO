import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Photo, PhotoService } from '../../services/photo.service';
import { ActionSheetController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';

//si no reconoce google declararla previamente
declare const google;

@Component({
  selector: 'app-gmaps',
  templateUrl: './gmaps.component.html',
  styleUrls: ['./gmaps.component.scss'],
})


export class GmapsComponent implements OnInit {

  //parecido a getElementbyId. En la vista HTML se refiere a #map no al id.
  @ViewChild('map', { static: true }) mapElement: ElementRef;

  map: any;
  miMarker: any; // marker con mi ubicacion

  miLatitud1: any;
  miLongitud1: any;

  constructor(private geolocation: Geolocation, public photoService: PhotoService, 
    public actionSheetController: ActionSheetController,
    public toastController: ToastController) { }

    async ngOnInit() {
    //se esperan coordenadas de geolocation y cuando llegan se inicia escucha de watchPosition
    this.getCoordenadas();
    await this.photoService.loadSaved();
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

  addPhotoToGallery() {
    this.photoService.addNewToGallery();
  }

  public async showActionSheet(photo: Photo, position: number) {
    //Defino un toast
    const toast = await this.toastController.create({
      message: 'Imagen eliminada correctamente.',
      duration: 2000
    });
    
    const actionSheet = await this.actionSheetController.create({
      header: 'Photos',
      buttons: [{
        text: 'Delete',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          this.photoService.deletePicture(photo, position);
          toast.present();
        },
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          // Nothing to do, action sheet is automatically closed
          }
      }]
    });
    await actionSheet.present();
  }

}


