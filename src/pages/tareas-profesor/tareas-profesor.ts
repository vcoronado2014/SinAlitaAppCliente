import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ToastController, ViewController, LoadingController, ModalController, App  } from 'ionic-angular';

import { GlobalService } from '../../app/Services/GlobalService';
//modales
import { DetalleAgendaPage } from '../../pages/detalle-agenda/detalle-agenda';
import { InicioPage } from '../../pages/Inicio/inicio';
import { CancelarClasePage } from '../../pages/cancelar-clase/cancelar-clase';
import { CerrarClasePage } from '../../pages/cerrar-clase/cerrar-clase';
import { MapaClientePage } from '../../pages/mapa-cliente/mapa-cliente';
import * as moment from 'moment';


/**
 * Generated class for the TareasProfesorPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-tareas-profesor',
  templateUrl: 'tareas-profesor.html',
})
export class TareasProfesorPage {
tareasArr = [];
profId;
rolId;

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
    //evaluamos algunas cosas antes de levantar esta pantalla
    this.profId =  sessionStorage.getItem('PROF_ID');
    this.rolId =  sessionStorage.getItem('ROL_ID');
    //si es profesor hacemos la llamada
    //despues controlamos al supervisor
    /*
    if (this.rolId == 3){
      this.cargarTareas();
    }
    */
    
  }
  ionViewWillEnter() {
    if (this.rolId == 3){
      this.cargarTareas();
    }
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

      this.global.postTareasProfesor(fechaEntera, profId).subscribe(
        data => {
          this.tareasArr = data.json();
          console.log(this.tareasArr);
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
      //loader.dismiss();
    });

  }
  abrirMapa(direccion){

    let modal = this.modalCtrl.create(MapaClientePage, {clase: direccion });
    modal.onDidDismiss(data => {
      // Data is your data from the modal
      if (data != undefined){
      }
    });
    modal.present();
  }
  gotoCancelarClase(clase){

    let modal = this.modalCtrl.create(CancelarClasePage, {clase: clase });
    modal.onDidDismiss(data => {
      // Data is your data from the modal
      if (data != undefined){
        if(data.mensaje == 'volver'){
          //this.viewCtrl.dismiss({ mensaje: 'volver' });
          //aca actualizamos la lista completa
          this.cargarTareas();
        }
      }
    });
    modal.present();
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
  cancelarClase(clase){
    var claseCancelar = {
      Descripcion: clase.Descripcion,
      FechaString: clase.FechaTexto,
      HoraInicio: clase.FechaHoraInicioTexto,
      HoraTermino: clase.FechaHoraTerminoTexto,
      Id: clase.Id
    };
    this.gotoCancelarClase(claseCancelar);

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
  doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    setTimeout(() => {
      if (this.rolId == 3){
        this.cargarTareas();
      }
      refresher.complete();
    }, 2000);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad TareasProfesorPage');
  }
  cerrarSesion(){
    sessionStorage.clear();
    //this.nav.popAll();
    //this.nav.setRoot(InicioPage);
    this.app.getRootNav().setRoot(InicioPage);
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

}
