import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ToastController, ViewController, LoadingController, ModalController  } from 'ionic-angular';

import { GlobalService } from '../../app/Services/GlobalService';
//modales
import { DetalleAgendaPage } from '../../pages/detalle-agenda/detalle-agenda';
import { InicioPage } from '../../pages/Inicio/inicio';
import * as moment from 'moment';

/**
 * Generated class for the AgendaProfesorPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-agenda-profesor',
  templateUrl: 'agenda-profesor.html',
})
export class AgendaProfesorPage {
  agendaArr = [];
  profId;
  myDate;
  maxDate;
  minDate;

  constructor(
    private nav: NavController,
    private alert: AlertController,
    public loading: LoadingController,
    public toastCtrl: ToastController,
    private navParams: NavParams,
    private viewCtrl: ViewController,
    private global: GlobalService,
    private modalCtrl: ModalController
  ) {
    this.maxDate = moment().add(4,'months').toISOString();
    this.minDate = moment().subtract(1,'months').toISOString();
    console.log(this.maxDate);
    this.myDate = moment().toISOString();
    this.profId = sessionStorage.getItem("PROF_ID");
    this.cargarAgenda();
  }

  cargarAgenda() {

    let loader = this.loading.create({
      content: 'Cargando...',
    });
    loader.present().then(() => {
      //por mientras

      var mesInicio = moment(this.myDate).month() + 1;
      var profId = this.profId;
      var anno = moment(this.myDate).year();

      this.global.postActualizarAgenda(mesInicio, profId, anno).subscribe(
        data => {
          this.agendaArr = data.json();
        },
        err => console.error(err),
        () => console.log('get alumnos completed')
      );
      loader.dismiss();
    });
  }
  doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    setTimeout(() => {
      this.cargarAgenda();
      refresher.complete();
    }, 2000);
  }
  detalleAgenda(agenda){
    //let mensaje = this.presentToast("Levantar pantalla editar profesor " + profesor.Nombres, "bottom", 2000);
    let modal = this.modalCtrl.create(DetalleAgendaPage, {agenda: agenda });
    modal.onDidDismiss(data => {
      // Data is your data from the modal
      if (data != undefined){
        //this.agendaArr = data;
        this.cargarAgenda();
      }
    });
    modal.present();

  }
  disponibilizarTodo(item) {

    const confirm = this.alert.create({
      title: 'Cupos disponibles',
      message: '¿Estas seguro de dejar todos tus cupos disponibles.?',
      buttons: [
        {
          text: 'No',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Si',
          handler: () => {

            let loader = this.loading.create({
              content: 'Disponibilizando...',
            });
            loader.present().then(() => {
              console.log(item);
              //ahora vamos a enviar los parametros a guardar
              //en este caso el arreglo se va completo, la api
              //determina que guarda y no
              var fechaEntera = item.FechaEntera;
              var profId = item.ProfId;
              var arrGuardar = '1,2,3,4,5,6,7,8';
              var arrGuardarNo = '';
              this.global.putSegmentos(
                1,
                fechaEntera,
                profId,
                arrGuardar.toString(),
                arrGuardarNo.toString()
              ).subscribe(
                data => {
                  //this.agendaArr = data.json();
                  this.cargarAgenda();
                },
                err => {
                  console.error(err);
                  let toast = this.presentToast("Error al guardar", "top", 2000);
                  loader.dismiss();
                },
                () => {
                  console.log('save completed');
                  let toast = this.presentToast("Registro guardado con éxito", "top", 2000);
                  loader.dismiss();
                }
              );
              loader.dismiss();
            });
          }
        }
      ]
    });
    confirm.present();


  }
  borrarTodo(item) {

    const confirm = this.alert.create({
      title: 'Cupos NO disponibles',
      message: '¿Estas seguro de desactivar todos tus cupos disponibles.?',
      buttons: [
        {
          text: 'No',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Si',
          handler: () => {

            let loader = this.loading.create({
              content: 'Desactivando...',
            });
            loader.present().then(() => {
              console.log(item);
              //ahora vamos a enviar los parametros a guardar
              //en este caso el arreglo se va completo, la api
              //determina que guarda y no
              var fechaEntera = item.FechaEntera;
              var profId = item.ProfId;
              var arrGuardar = '';
              var arrGuardarNo = '1,2,3,4,5,6,7,8';
              this.global.putSegmentos(
                1,
                fechaEntera,
                profId,
                arrGuardar.toString(),
                arrGuardarNo.toString()
              ).subscribe(
                data => {
                  //this.agendaArr = data.json();
                  this.cargarAgenda();
                },
                err => {
                  console.error(err);
                  let toast = this.presentToast("Error al guardar", "top", 2000);
                  loader.dismiss();
                },
                () => {
                  console.log('save completed');
                  let toast = this.presentToast("Registro guardado con éxito", "top", 2000);
                  loader.dismiss();
                }
              );
              loader.dismiss();
            });
          }
        }
      ]
    });
    confirm.present();


  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad AgendaProfesorPage');
  }
  cerrarSesion(){
    sessionStorage.clear();
    this.nav.setRoot(InicioPage);
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
