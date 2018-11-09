import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ToastController, ViewController, LoadingController, ModalController  } from 'ionic-angular';

import { GlobalService } from '../../app/Services/GlobalService';

/**
 * Generated class for the InfoCuposPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-info-cupos',
  templateUrl: 'info-cupos.html',
})
export class InfoCuposPage {
cuposMostrar;
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
    this.cuposMostrar =  navParams.get('info');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InfoCuposPage');
  }
  cancel(){
    this.viewCtrl.dismiss();
  }

}
