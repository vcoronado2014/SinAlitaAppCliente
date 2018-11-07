import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
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

  constructor(public nav: NavController, public navParams: NavParams) {
  }
  cerrarSesion(){
    sessionStorage.clear();
    this.nav.setRoot(InicioPage);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad PacksPage');
  }

}
