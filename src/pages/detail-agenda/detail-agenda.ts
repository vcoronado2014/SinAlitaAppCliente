import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';

/**
 * Generated class for the DetailAgendaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-detail-agenda',
  templateUrl: 'detail-agenda.html',
})
export class DetailAgendaPage {

  public idElemento;

  constructor(
    private nav: NavController,
    private alert: AlertController,
    public loading: LoadingController,
    public toastCtrl: ToastController,
    private navParams: NavParams
  ) {

    this.idElemento = navParams.get('id');

    let loader = this.loading.create({
      content: 'Cargando...',
    });

    loader.present().then(() => {
      //aca las llamadas ajax
      /*      this.listarTipoMovimientos();
       this.recuperarRendicion(this.rendicion.Id);*/

      loader.dismiss();
    });
  }


}
