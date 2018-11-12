import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ToastController, ViewController, LoadingController, ModalController  } from 'ionic-angular';

import { GlobalService } from '../../app/Services/GlobalService';

import * as moment from 'moment';

/**
 * Generated class for the TarjetaClientePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-tarjeta-cliente',
  templateUrl: 'tarjeta-cliente.html',
})
export class TarjetaClientePage {
cliente;
  constructor(   
    private nav: NavController,
    private alert: AlertController,
    public loading: LoadingController,
    public toastCtrl: ToastController,
    private navParams: NavParams,
    private viewCtrl: ViewController,
    private global: GlobalService,
    private modalCtrl: ModalController) {
      this.cliente =  navParams.get('cliente');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TarjetaClientePage');
  }
  cancel(){
    this.viewCtrl.dismiss();
  }

}
