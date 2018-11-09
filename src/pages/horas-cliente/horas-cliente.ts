import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ToastController, ViewController, LoadingController, ModalController  } from 'ionic-angular';

import { GlobalService } from '../../app/Services/GlobalService';

import * as moment from 'moment';

/**
 * Generated class for the HorasClientePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-horas-cliente',
  templateUrl: 'horas-cliente.html',
})
export class HorasClientePage {
  pcoId;
  horaEnvoltorio;
  tieneAceptaCondiciones = false;

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
      this.pcoId =  navParams.get('pcoId');
      console.log(this.pcoId);
      this.cargar();

  }
  cargar() {
    let loader = this.loading.create({
      content: 'Cargando...',
    });
    loader.present().then(() => {
      var estado = '0';
      var codigo = '';
      this.global.postClientePackProducto(this.pcoId).subscribe(
        data => {
          this.horaEnvoltorio = data.json();
          if (this.horaEnvoltorio.Condiciones && this.horaEnvoltorio.Condiciones.Id > 0){
            this.tieneAceptaCondiciones = true;
          }

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
      this.cargar();
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
  cancel(){
    this.viewCtrl.dismiss();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad HorasClientePage');
  }

}
