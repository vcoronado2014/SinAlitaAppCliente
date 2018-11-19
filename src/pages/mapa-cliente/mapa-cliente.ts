import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
//para gmaps
import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import { Geocoder } from '@ionic-native/google-maps';
declare var google;

/**
 * Generated class for the MapaClientePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-mapa-cliente',
  templateUrl: 'mapa-cliente.html',
})
export class MapaClientePage {
  mostrarElMapa = true;
  map: any;
  direccion;
  latitud: number;
  longitud: number;
  constructor(public navCtrl: NavController, public navParams: NavParams, private geolocation: Geolocation, private viewCtrl: ViewController) {
    this.direccion =  navParams.get('clase');
    //this.getPosition();
    var geocoder = new google.maps.Geocoder();
    this.geocodeAddress(geocoder);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MapaClientePage');
  }
  /*
  getPosition():any{
    this.geolocation.getCurrentPosition().then(response => {
      this.loadMap(response);
    })
    .catch(error =>{
      console.log(error);
    })
  }
  */
  loadMap(){
    //let latitude = position.coords.latitude;
    //let longitude = position.coords.longitude;
    
    //console.log(latitude, longitude);
    
    // create a new map by passing HTMLElement
    let mapEle: HTMLElement = document.getElementById('map');
  
    // create LatLng object
    let myLatLng = {lat: this.latitud, lng: this.longitud};
  
    // create map
    this.map = new google.maps.Map(mapEle, {
      center: myLatLng,
      zoom: 12
    });
  
    google.maps.event.addListenerOnce(this.map, 'idle', () => {
      let marker = new google.maps.Marker({
        position: myLatLng,
        map: this.map,
        title: 'Hello World!'
      });
      mapEle.classList.add('show-map');
    });
  }
  mostrarMapa(){
    //let latitude = position.coords.latitude;
    //let longitude = position.coords.longitude;
    
    //console.log(latitude, longitude);
    
    // create a new map by passing HTMLElement
    let mapEle: HTMLElement = document.getElementById('map');
  
    // create LatLng object
    let myLatLng = {lat: this.latitud, lng: this.longitud};
  
    // create map
    this.map = new google.maps.Map(mapEle, {
      center: myLatLng,
      zoom: 12
    });
  
    google.maps.event.addListenerOnce(this.map, 'idle', () => {
      let marker = new google.maps.Marker({
        position: myLatLng,
        map: this.map,
        title: 'Dirección del Cliente'
      });
      mapEle.classList.add('show-map');
    });
  }
  presentToast = function(mensaje, posicion, duracion) {
    let toast = this.toastCtrl.create({
      message: mensaje,
      duration: duracion,
      position: posicion
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }
  cancel(){
    //this.viewCtrl.dismiss();
    this.viewCtrl.dismiss({ mensaje: 'volver' });
  }
  geocodeAddress(geocoder) {
    var address = this.direccion;
    geocoder.geocode({'address': address}, function(results, status) {
      if (status === 'OK') {
        var respuesta = results;
        if (respuesta && respuesta.length > 0){
          this.mostrarElMapa = true;

          this.latitud = respuesta[0].geometry.location.lat();
          this.longitud = respuesta[0].geometry.location.lng();
          console.log(this.latitud);
          console.log(this.longitud);
          let mapEle: HTMLElement = document.getElementById('map');
  
          // create LatLng object
          let myLatLng = {lat: this.latitud, lng: this.longitud};
        
          // create map
          this.map = new google.maps.Map(mapEle, {
            center: myLatLng,
            zoom: 12
          });
        
          google.maps.event.addListenerOnce(this.map, 'idle', () => {
            let marker = new google.maps.Marker({
              position: myLatLng,
              map: this.map,
              title: 'Hello World!'
            });
            mapEle.classList.add('show-map');
          });
        }
        else {
          this.mostrarElMapa = false;
          let sms = this.presentToast('No hay coincidencias ', 'bottom', 3000);
        }

      } else {
        this.mostrarElMapa = false;
        let sms = this.presentToast('No se puede mostrar la información: ' + status, 'bottom', 3000);
        //alert('Geocode was not successful for the following reason: ' + status);
      }
    });
  }

}
