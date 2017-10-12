import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { DetailAgendaPage } from '../../pages/detail-agenda/detail-agenda';

/**
 * Generated class for the DetailPackPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-detail-pack',
  templateUrl: 'detail-pack.html',
})
export class DetailPackPage {

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
  goToDetails(id){
    this.nav.push(DetailAgendaPage, {id: id });
  }

}
