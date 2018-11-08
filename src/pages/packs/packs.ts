import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ToastController, ViewController, LoadingController, ModalController  } from 'ionic-angular';

import { GlobalService } from '../../app/Services/GlobalService';
import { InicioPage } from '../../pages/Inicio/inicio';

/**
 * Generated class for the PacksPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-packs',
  templateUrl: 'packs.html',
})
export class PacksPage {

  packArr = [];
  constructor(    
    private nav: NavController,
    private alert: AlertController,
    public loading: LoadingController,
    public toastCtrl: ToastController,
    private navParams: NavParams,
    private viewCtrl: ViewController,
    private global: GlobalService,
    private modalCtrl: ModalController) {
      this.cargarPack();
  }
  cerrarSesion(){
    sessionStorage.clear();
    this.nav.setRoot(InicioPage);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad PacksPage');
  }
  cargarPack() {
    let loader = this.loading.create({
      content: 'Cargando...',
    });
    loader.present().then(() => {
      var estado = '0';
      var codigo = '';
      this.global.postObtenerPCOGrilla(estado, codigo).subscribe(
        data => {
          this.packArr = data.json();

        },
        err => console.error(err),
        () => console.log('get alumnos completed')
      );
      loader.dismiss();
    });
  }
  doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    setTimeout(() => {
      this.cargarPack();
      refresher.complete();
    }, 2000);
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
}
