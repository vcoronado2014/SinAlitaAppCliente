import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ToastController, ViewController, LoadingController, ModalController, App  } from 'ionic-angular';

import { GlobalService } from '../../app/Services/GlobalService';
import { InicioPage } from '../../pages/Inicio/inicio';
import * as moment from 'moment';

/**
 * Generated class for the PlanillaProfesoresPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-planilla-profesores',
  templateUrl: 'planilla-profesores.html',
})
export class PlanillaProfesoresPage {
planillaArr=[];
myDate;
maxDate;
minDate;
  constructor(
    private nav: NavController,
    private app: App,
    private alert: AlertController,
    public loading: LoadingController,
    public toastCtrl: ToastController,
    private navParams: NavParams,
    private viewCtrl: ViewController,
    private global: GlobalService,
    private modalCtrl: ModalController
  ) {
    //seteamos moment
    moment.locale('es'); 
    this.maxDate = moment().add(2,'months').toISOString();
    this.minDate = moment().subtract(1,'months').toISOString();
    console.log(this.maxDate);
    this.myDate = moment().toISOString();
    //this.cargarPlanilla();

  }
  ionViewWillEnter() {
    this.cargarPlanilla();
  }
  cerrarSesion(){
    sessionStorage.clear();
    
    //this.nav.setRoot(InicioPage);
    //this.nav.popAll();
    this.app.getRootNav().setRoot(InicioPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PlanillaProfesoresPage');
  }
  doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    setTimeout(() => {
      this.cargarPlanilla();
      refresher.complete();
    }, 2000);
  }
  presentToast = function(mensaje, posicion, duracion) {
    let toast = this.toastCtrl.create({
      message: mensaje,
      duration: duracion,
      position: posicion
    }); 

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }
  cargarPlanilla() {
    this.planillaArr=[];
    //porcesamos la fecha
    var fechaEnteraStr = moment(this.myDate).format("YYYYMMDD");

    let loader = this.loading.create({
      content: 'Cargando...',
    });
    loader.present().then(() => {
      var estado = '0';
      var codigo = '';
      this.global.postPlanillaProfesores(fechaEnteraStr).subscribe(
        data => {
          var datos =  data.json();
          if (datos){
            datos.forEach(element => {
              if (element.Detalle){
                element.Detalle.forEach(detalle => {
                  detalle.FechaStr = moment(detalle.Fecha).format("dddd, MMMM Do YYYY");
                });
              }
            });
          }

          this.planillaArr = datos;

        },
        err => {
          console.error(err);
          loader.dismiss();
        },
        () => {
          console.log('get alumnos completed');
          loader.dismiss();
        }
      );
      
    });
  }

}
