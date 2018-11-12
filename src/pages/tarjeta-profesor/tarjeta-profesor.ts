import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ToastController, ViewController, LoadingController, ModalController  } from 'ionic-angular';

import { GlobalService } from '../../app/Services/GlobalService';

import * as moment from 'moment';

/**
 * Generated class for the TarjetaProfesorPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-tarjeta-profesor',
  templateUrl: 'tarjeta-profesor.html',
})
export class TarjetaProfesorPage {
profesor;
  constructor(
    private nav: NavController,
    private alert: AlertController,
    public loading: LoadingController,
    public toastCtrl: ToastController,
    private navParams: NavParams,
    private viewCtrl: ViewController,
    private global: GlobalService,
    private modalCtrl: ModalController) {
      this.profesor =  navParams.get('profesor');
      //this.profesor.NombreCompleto = this.profesor.Nombres + ' ' + this.profesor.PrimerApellido + ' ' + this.profesor.SegundoApellido;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TarjetaProfesorPage');
  }
  cancel(){
    this.viewCtrl.dismiss();
  }

}
