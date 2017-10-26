import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ToastController, ViewController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';

/**
 * Generated class for the CreaAlumnoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-crea-alumno',
  templateUrl: 'crea-alumno.html',
})
export class CreaAlumnoPage {
  //aca necesitamos
  //el id del cliente para buscar una lista de alumnos que tenga,
  //mostrarlos en un combo y que lo pueda usar


  constructor(
    private nav: NavController,
    private alert: AlertController,
    public loading: LoadingController,
    public toastCtrl: ToastController,
    private navParams: NavParams,
    private viewCtrl: ViewController
  ) {

  }

  close(){
    //aca hay que ir a la pagina anterior con push
    this.viewCtrl.dismiss();
  }
}
