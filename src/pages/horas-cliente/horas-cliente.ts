import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ToastController, ViewController, LoadingController, ModalController  } from 'ionic-angular';

import { GlobalService } from '../../app/Services/GlobalService';
import {AppSettings} from "../../../AppSettings";
import { InfoCuposPage } from '../../pages/info-cupos/info-cupos';
import { AgendarHorasPage } from '../../pages/agendar-horas/agendar-horas';

import * as moment from 'moment';

/**
 * Generated class for the HorasClientePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-horas-cliente',
  templateUrl: 'horas-cliente.html',
})
export class HorasClientePage {
  pcoId;
  comId;
  horaEnvoltorio;
  comunaCliente;
  cuposArr = [];
  nombreCompletoCliente;
  direccionCliente;
  emailCliente;
  telefonosContactoCliente;
  nombreComunaCliente;

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
      this.horaEnvoltorio =  navParams.get('envoltorio');
      console.log(this.horaEnvoltorio);
      this.comId = this.horaEnvoltorio.Comuna.Id;
      this.pcoId = this.horaEnvoltorio.ProductoCodigo.Id;
      //datos del cliente
      this.nombreCompletoCliente = this.horaEnvoltorio.Cliente.Nombres + ' ' + this.horaEnvoltorio.Cliente.PrimerApellido;
      this.direccionCliente = this.horaEnvoltorio.Cliente.Direccion;
      this.emailCliente = this.horaEnvoltorio.Cliente.Email;
      this.telefonosContactoCliente = this.horaEnvoltorio.Cliente.TelefonosContacto;
      this.nombreComunaCliente = this.horaEnvoltorio.Comuna.Nombre;


      //this.cargarComunaCliente();
      this.cargarCupos();

  }
  cargarComunaCliente() {
    let loader = this.loading.create({
      content: 'Cargando...',
    });
    loader.present().then(() => {
      this.global.getComunaId(this.comId).subscribe(
        data => {
          this.comunaCliente = data.json();
        },
        err => console.error(err),
        () => console.log('get comuna cliente completed')
      );
      loader.dismiss();
    });
  }

  cargarCupos() {
    let loader = this.loading.create({
      content: 'Cargando Cupos...',
    });
    loader.present().then(() => {
      this.global.postProfesorCupo(this.comId, this.pcoId).subscribe(
        data => {
          var datos = data.json();
          datos.forEach(element => {
            if (element.Profesor.Fotografia == ''){
              element.Profesor.Fotografia = AppSettings.URL_FOTOS + "img/no_foto.png";
            }
            else {
              element.Profesor.Fotografia =AppSettings.URL_FOTOS + "img/" + element.Profesor.Fotografia;
            }
          });
          this.cuposArr = datos;
        },
        err => {
          loader.dismiss();
          console.error(err);
        },
        () => {
          loader.dismiss();
          console.log('get cupos completed');
        }
      );
      //loader.dismiss();
    });
  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    setTimeout(() => {
      this.cargarCupos();
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
  cancel(){
    this.viewCtrl.dismiss();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad HorasClientePage');
  }
/*
  infoSemanas(cuposMostrar){
    var listItems = [];

    cuposMostrar.forEach(element => {
      var texto = element.FechaLetras;
      var cantidad = element.Cupos.length.toString();
      let li = new ListItem;
      li.name = texto;
      li.total = cantidad;
      listItems.push(li);

    });
    const alert = this.alert.create({
      title: 'Información',
      subTitle: '',
      buttons: ['Aceptar']
    });
    alert.present();
  }
*/
  mostrarInfoCupos(cuposMostrar){
    let modal = this.modalCtrl.create(InfoCuposPage, {info: cuposMostrar });
    modal.onDidDismiss(data => {
      // Data is your data from the modal
      if (data != undefined){
        //this.cargarProfesores();
      }
    });
    modal.present();
  }
  mostrarAgendarHoras(cuposMostrar){
    let modal = this.modalCtrl.create(AgendarHorasPage, {info: cuposMostrar });
    modal.onDidDismiss(data => {
      // Data is your data from the modal
      if (data != undefined){
        //this.cargarProfesores();
      }
    });
    modal.present();
  }
}
class ListItem {
  name: string;
  total: string;
}