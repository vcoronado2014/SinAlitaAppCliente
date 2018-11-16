import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ToastController, ViewController, LoadingController, ModalController  } from 'ionic-angular';

import { GlobalService } from '../../app/Services/GlobalService';
import {AppSettings} from "../../../AppSettings";
import * as moment from 'moment';
import { TarjetaProfesorPage } from '../../pages/tarjeta-profesor/tarjeta-profesor';
import { TarjetaClientePage } from '../../pages/tarjeta-cliente/tarjeta-cliente';
import { CancelarClasePage } from '../../pages/cancelar-clase/cancelar-clase';

/**
 * Generated class for the SemanasClientePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-semanas-cliente',
  templateUrl: 'semanas-cliente.html',
})
export class SemanasClientePage {
horaEnvoltorio;
fotoProfesor;
profesor;
cliente;
cantidadCupos = 0;
cuposArr = [];
rolIdLogueado;
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
      moment.locale('es'); 
      this.rolIdLogueado = sessionStorage.getItem("ROL_ID");
      this.horaEnvoltorio =  navParams.get('envoltorio');
      console.log(this.horaEnvoltorio);
      this.cliente = this.horaEnvoltorio.Cliente;
      this.cliente.NombreCompleto = this.cliente.Nombres + ' ' + this.cliente.PrimerApellido + ' ' + this.cliente.SegundoApellido;
      //sacamos el id del profesor
      if (this.horaEnvoltorio.CuposTomados){
        this.cantidadCupos = this.horaEnvoltorio.CuposTomados.length;
        this.procesarCupos();
      }
  }
 
  procesarCupos() {
    this.cuposArr= [];
    let loader = this.loading.create({
      content: 'Cargando...',
    });
    loader.present().then(() => {
      this.horaEnvoltorio.CuposTomados.forEach(cupo => {
        var estado = 'Agendado';
        var fechaEvaluar = moment(cupo.FechaHoraTermino);
        var fechaActual = moment();
        var fechaString = moment(cupo.FechaHoraInicio).format("dddd, MMMM Do YYYY");
        var muestraCancelar = false;
        var horaInicio = moment(cupo.FechaHoraInicio).format("hh:mm");
        var horaTermino = moment(cupo.FechaHoraTermino).format("hh:mm");

        if (fechaEvaluar < fechaActual) {
          estado = 'Terminado';
        }
        if (estado == 'Agendado') {
          muestraCancelar = true;
        }
        cupo.FechaString = fechaString;
        cupo.Estado = estado;
        cupo.MuestraCancelar = muestraCancelar;
        cupo.HoraInicio = horaInicio;
        cupo.HoraTermino = horaTermino;
        this.cuposArr.push(cupo);
      });
    });
    loader.dismiss();
  }
  doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    setTimeout(() => {
      this.procesarCupos();
      refresher.complete();
    }, 2000);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SemanasClientePage');
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
  cancel(){
    this.viewCtrl.dismiss();
  }
  gotoCliente(){

    let modal = this.modalCtrl.create(TarjetaClientePage, {cliente: this.cliente });
    modal.onDidDismiss(data => {
      // Data is your data from the modal
      if (data != undefined){
        //this.cargarProfesores();
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
          this.viewCtrl.dismiss({ mensaje: 'volver' });
        }
      }
    });
    modal.present();
  }
  gotoProfesor(){
    var profId = this.horaEnvoltorio.CuposTomados[0].ProfId;
    //ahora hacemos el post para el profesor
    let loader = this.loading.create({
      content: 'Cargando...',
    });
    loader.present().then(() => {
      this.global.postProfesor(profId).subscribe(
        data => {
          this.profesor = data.json();
          if (this.profesor.Fotografia == ''){
            this.profesor.Fotografia = AppSettings.URL_FOTOS + "img/no_foto.png";
          }
          else {
            this.profesor.Fotografia =AppSettings.URL_FOTOS + "img/" + this.profesor.Fotografia;
            this.fotoProfesor = this.profesor.Fotografia;
          }
          this.profesor.NombreCompleto = this.profesor.Nombres + ' ' + this.profesor.PrimerApellido + ' ' + this.profesor.SegundoApellido;

          console.log(this.profesor);
          let modal = this.modalCtrl.create(TarjetaProfesorPage, {profesor: this.profesor });
          modal.onDidDismiss(data => {
            // Data is your data from the modal
            if (data != undefined){
              //this.cargarProfesores();
            }
          });
          modal.present();

        },
        err => {
          console.error(err);
          loader.dismiss();
        },
        () => {
          console.log('get profesor completed');
          loader.dismiss();
        }
      );
      
    });



  }
}
