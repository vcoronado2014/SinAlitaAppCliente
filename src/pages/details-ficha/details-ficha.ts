import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ToastController, ViewController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';

/**
 * Generated class for the DetailsFichaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-details-ficha',
  templateUrl: 'details-ficha.html',
})
export class DetailsFichaPage {
  public fichaAlumno;
  constructor(
    private nav: NavController,
    private alert: AlertController,
    public loading: LoadingController,
    public toastCtrl: ToastController,
    private navParams: NavParams,
    private viewCtrl: ViewController
  ) {

    this.fichaAlumno = navParams.get('fichaAlumno');
    let loader = this.loading.create({
      content: 'Cargando...',
    });

    loader.present().then(() => {



      loader.dismiss();
    });


  }

  close(){
    this.viewCtrl.dismiss();
  }

}
