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
  agendaArr=[];
  habilitaBotonGuardar = true;
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
        if (this.agenda.DeshabilitaBorrarTodo == 0 && this.agenda.DeshabilitaCrearTodo == 0){
          this.habilitaBotonGuardar = false;
        }
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
  guardar() {

    let loader = this.loading.create({
      content: 'Guardando...',
    });

    loader.present().then(() => {
      var arregloSegmentosGuardar = "";
      var arrGuardar = [];
      var arrGuardarNo = [];

      this.segmentosArr.forEach(element => {
        var ele = element;
        if (ele.EsSeleccionado) {
          //agregar los elementos a guardar
          arrGuardar.push(ele.SghId);
        }
        else{
          arrGuardarNo.push(ele.SghId);
        }

      });
     // if (arrGuardar.length > 0) {
        //enviar a guardar
        console.log(arrGuardar.toString());
        this.global.putSegmentos(
          1,
          this.agenda.FechaEntera,
          this.agenda.ProfId,
          arrGuardar.toString(),
          arrGuardarNo.toString()
        ).subscribe(
          data => {
            this.agendaArr = data.json();
          },
          err => {
            console.error(err);
            let toast = this.presentToast("Error al guardar", "top", 2000);
            loader.dismiss();
          },
          () => {
            console.log('save completed');
            let toast = this.presentToast("Registro guardado con éxito", "top", 2000);
            //ProfesoresPage.cargarProfesores();
            loader.dismiss();
            //volvemos a la página anterior
            this.viewCtrl.dismiss({ agenda: this.agendaArr });
          }
        );

        /*
      }
      else {
        loader.dismiss();
        let mensaje = this.presentToast('Debe seleccionar horas para guardar', 'top', 2000);

      }
*/
    });
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
