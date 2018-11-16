import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ToastController, ViewController, LoadingController, ModalController  } from 'ionic-angular';

import { GlobalService } from '../../app/Services/GlobalService';

import * as moment from 'moment';

/**
 * Generated class for the CerrarClasePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-cerrar-clase',
  templateUrl: 'cerrar-clase.html',
})
export class CerrarClasePage {
  claseCerrar;
  motivo;

  constructor(
    private nav: NavController,
    private alert: AlertController,
    public loading: LoadingController,
    public toastCtrl: ToastController,
    private navParams: NavParams,
    private viewCtrl: ViewController,
    private global: GlobalService,
    private modalCtrl: ModalController
  ) {
    this.claseCerrar =  navParams.get('clase');
    console.log(this.claseCerrar);
  }
  cerrarClase() {
    if (this.motivo == '' || this.motivo == undefined){
      let sms = this.presentToast('El motivo de cancelación es requerido', 'bottom', 3000);
      return;
    }

    let loader = this.loading.create({
      content: 'Cargando...',
    });

    loader.present().then(() => {
      var id = this.claseCerrar.Id;


      this.global.cerrarCupo(
        id,
        this.motivo
      ).subscribe(
        data => {
          var datos = data.json();
        },
        err => {
          console.error(err);
          let toast = this.presentToast("Error al guardar", "top", 2000);
          loader.dismiss();
        },
        () => {
          console.log('save completed');
          let toast = this.presentToast("Cerrada con éxito", "top", 2000);
          //ProfesoresPage.cargarProfesores();
          loader.dismiss();
          //volvemos a la página anterior
          this.viewCtrl.dismiss({ mensaje: 'volver' });
        }
      );
    });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad CerrarClasePage');
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
    this.viewCtrl.dismiss();
  }

}
