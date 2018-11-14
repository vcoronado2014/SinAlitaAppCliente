import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ProfesoresPage } from '../../pages/profesores/profesores';
import { ClientesPage } from '../../pages/clientes/clientes';
import { PacksPage } from '../../pages/packs/packs';
import { PlanillaProfesoresPage } from '../../pages/planilla-profesores/planilla-profesores';

/**
 * Generated class for the SupervisorPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-supervisor',
  templateUrl: 'supervisor.html',
})
export class SupervisorPage {
  tab1Root = ClientesPage;
  tab2Root = PacksPage;
  tab3Root = ProfesoresPage;
  tab4Root = PlanillaProfesoresPage;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad SupervisorPage');
  }

}
