import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ToastController, ViewController, LoadingController, ModalController  } from 'ionic-angular';

import { GlobalService } from '../../app/Services/GlobalService';

import * as moment from 'moment';

/**
 * Generated class for the DetalleAgendaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-detalle-agenda',
  templateUrl: 'detalle-agenda.html',
})
export class DetalleAgendaPage {
  titulo;
  agenda;
  profId;
  segmentosArr=[];
  constructor(   
     private nav: NavController,
    private alert: AlertController,
    public loading: LoadingController,
    public toastCtrl: ToastController,
    private navParams: NavParams,
    private viewCtrl: ViewController,
    private global: GlobalService,
    private modalCtrl: ModalController,) {
      this.profId = sessionStorage.getItem("PROF_ID");
      this.agenda =  navParams.get('agenda');
      if (this.agenda){
        this.titulo = "Agenda del " + this.agenda.DiaSemana + " " + this.agenda.DiaSemanaInt.toString();
        this.buscarSegmentos(this.agenda);
      }
      else {
        //mostrar que no hay datos

      }
  }
  buscarSegmentos(agenda) {

    let loader = this.loading.create({
      content: 'Cargando...',
    });
    loader.present().then(() => {
      //por mientras

      var fechaEntera = agenda.FechaEntera;
      var profId = this.profId;
      var esBloqueado = 0;

      this.global.postBuscarSegmentos(fechaEntera, profId, esBloqueado).subscribe(
        data => {
          this.segmentosArr = data.json();
        },
        err => console.error(err),
        () => console.log('get alumnos completed')
      );
      loader.dismiss();
    });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad DetalleAgendaPage');
  }
  cancel(){
    this.viewCtrl.dismiss();
  }

}
