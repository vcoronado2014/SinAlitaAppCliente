import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
//pages
import { AgendaProfesorPage } from '../../pages/agenda-profesor/agenda-profesor';

/**
 * Generated class for the ProfesorPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-profesor',
  templateUrl: 'profesor.html',
})
export class ProfesorPage {
  tab1Root = AgendaProfesorPage;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfesorPage');
  }

}
