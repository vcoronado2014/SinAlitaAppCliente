import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ToastController, ViewController, LoadingController, ModalController, App  } from 'ionic-angular';

import { GlobalService } from '../../app/Services/GlobalService';
//modales
import { DetalleAgendaPage } from '../../pages/detalle-agenda/detalle-agenda';
import { InicioPage } from '../../pages/Inicio/inicio';
import { CancelarClasePage } from '../../pages/cancelar-clase/cancelar-clase';
import { CerrarClasePage } from '../../pages/cerrar-clase/cerrar-clase';
import * as moment from 'moment';

/**
 * Generated class for the TareasProfesorRealizadasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-tareas-profesor-realizadas',
  templateUrl: 'tareas-profesor-realizadas.html',
})
export class TareasProfesorRealizadasPage {
  tareasArr = [];
  profId;
  rolId;
  noHayElementos = true;
  constructor(
    private app: App,
    private nav: NavController,
    private alert: AlertController,
    public loading: LoadingController,
    public toastCtrl: ToastController,
    private navParams: NavParams,
    private viewCtrl: ViewController,
    private global: GlobalService,
    private modalCtrl: ModalController
  ) {
    this.profId =  sessionStorage.getItem('PROF_ID');
    this.rolId =  sessionStorage.getItem('ROL_ID');
  }

  ionViewWillEnter() {
    if (this.rolId == 3){
      this.cargarTareas();
    }
  }
  doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    setTimeout(() => {
      if (this.rolId == 3){
        this.cargarTareas();
      }
      refresher.complete();
    }, 2000);
  }
  cargarTareas() {
    this.tareasArr = [];
    let loader = this.loading.create({
      content: 'Cargando...',
    });
    loader.present().then(() => {
      //por mientras

      var profId = this.profId;
      var fechaEntera = moment().format("YYYYMMDD");

      this.global.postTareasProfesorRealizadas(fechaEntera, profId).subscribe(
        data => {
          this.tareasArr = data.json();
          if (this.tareasArr && this.tareasArr.length > 0){
            this.noHayElementos = false;
          }
          console.log(this.tareasArr);
        },
        err => {
          console.error(err);
          loader.dismiss();
        },
        () => {
          console.log('get tareas completed');
          loader.dismiss();
        }
      );
      //loader.dismiss();
    });

  }
  cerrarSesion(){
    sessionStorage.clear();
    this.app.getRootNav().setRoot(InicioPage);
  }
  gotoCerrarClase(clase){

    let modal = this.modalCtrl.create(CerrarClasePage, {clase: clase });
    modal.onDidDismiss(data => {
      // Data is your data from the modal
      if (data != undefined){
        if(data.mensaje == 'volver'){
          //aca actualizamos la lista completa
          this.cargarTareas();
        }
      }
    });
    modal.present();
  }
  cerrarClase(clase){
    var claseCerrar = {
      Descripcion: clase.Descripcion,
      FechaString: clase.FechaTexto,
      HoraInicio: clase.FechaHoraInicioTexto,
      HoraTermino: clase.FechaHoraTerminoTexto,
      Id: clase.Id
    };
    this.gotoCerrarClase(claseCerrar);

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
  ionViewDidLoad() {
    console.log('ionViewDidLoad TareasProfesorRealizadasPage');
  }

}
