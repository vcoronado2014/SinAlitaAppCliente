import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
//pages
import { AgendaProfesorPage } from '../../pages/agenda-profesor/agenda-profesor';
import { TareasProfesorPage } from '../../pages/tareas-profesor/tareas-profesor';
import { TareasProfesorRealizadasPage } from '../../pages/tareas-profesor-realizadas/tareas-profesor-realizadas';
import { PacksPage } from '../../pages/packs/packs';

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
  tab1RootProf = AgendaProfesorPage;
  tab2RootProf = TareasProfesorPage;
  tab3RootProf = PacksPage;
  tab4RootProf = TareasProfesorRealizadasPage;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfesorPage');
  }

}
