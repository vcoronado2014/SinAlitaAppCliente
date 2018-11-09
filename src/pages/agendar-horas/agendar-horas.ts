import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ToastController, ViewController, LoadingController, ModalController  } from 'ionic-angular';

import { GlobalService } from '../../app/Services/GlobalService';

/**
 * Generated class for the AgendarHorasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-agendar-horas',
  templateUrl: 'agendar-horas.html',
})
export class AgendarHorasPage {
cupoCompleto;
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
    this.cupoCompleto =  navParams.get('info');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AgendarHorasPage');
  }
  cancel(){
    this.viewCtrl.dismiss();
  }
}
