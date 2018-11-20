import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, AlertController, ToastController, ViewController, LoadingController, ModalController, App  } from 'ionic-angular';

import { GlobalService } from '../../app/Services/GlobalService';
import { InicioPage } from '../../pages/inicio/inicio';
import { HorasClientePage } from '../../pages/horas-cliente/horas-cliente';
import { SemanasClientePage } from '../../pages/semanas-cliente/semanas-cliente';

/**
 * Generated class for the PacksPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-packs',
  templateUrl: 'packs.html',
})
export class PacksPage {
  noHayElementos = false;
  packArr = [];
  rolIdLogueado;
  constructor(    
    private nav: NavController,
    private app: App,
    private alert: AlertController,
    public loading: LoadingController,
    public toastCtrl: ToastController,
    private navParams: NavParams,
    private viewCtrl: ViewController,
    private global: GlobalService,
    private modalCtrl: ModalController) {
      this.rolIdLogueado = sessionStorage.getItem("ROL_ID");
      //debemos evaluar si se trata de un profesor o supervisor
      /*
      var rolId = sessionStorage.getItem("ROL_ID");
      if (rolId == '3'){
        //profesor
        this.cargarPackProfesor();
      }
      else {
        //supervisor
        this.cargarPack();  
      }
      */
  }
  ionViewWillEnter() {
    var rolId = sessionStorage.getItem("ROL_ID");
    if (rolId == '3'){
      //profesor
      this.cargarPackProfesor();
    }
    else {
      //supervisor
      this.cargarPack();  
    }
  }
  /*
  ngOnInit(){
    var rolId = sessionStorage.getItem("ROL_ID");
    if (rolId == '3'){
      //profesor
      this.cargarPackProfesor();
    }
    else {
      //supervisor
      this.cargarPack();  
    }
  }
  */
  cerrarSesion(){
    sessionStorage.clear();
    
    //this.nav.setRoot(InicioPage);
    //this.nav.popAll();
    this.app.getRootNav().setRoot(InicioPage);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad PacksPage');
  }
  cargarPack() {
    let loader = this.loading.create({
      content: 'Cargando...',
    });
    loader.present().then(() => {
      var estado = '0';
      var codigo = '';
      this.global.postObtenerPCOGrilla(estado, codigo).subscribe(
        data => {
          this.packArr = data.json();
          if (this.packArr.length == 0){
            this.noHayElementos = true;
          }

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
  cargarPackProfesor() {
    let loader = this.loading.create({
      content: 'Cargando...',
    });
    loader.present().then(() => {
      var estado = '0';
      var codigo = '';
      this.global.postObtenerPCOGrillaProfesor(estado, codigo).subscribe(
        data => {
          this.packArr = data.json();
          if (this.packArr.length == 0){
            this.noHayElementos = true;
          }
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
  doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    setTimeout(() => {
      var rolId = sessionStorage.getItem("ROL_ID");
      if (rolId == '3'){
        //profesor
        this.cargarPackProfesor();
      }
      else {
        //supervisor
        this.cargarPack();  
      }
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
  gotoHorasCliente(envoltorio){
    let modal = this.modalCtrl.create(HorasClientePage, {envoltorio: envoltorio });
    modal.onDidDismiss(data => {
      // Data is your data from the modal
      if (data != undefined){
        //aca debería actualizarse la lista completa
        var rolId = sessionStorage.getItem("ROL_ID");
        if (rolId == '3'){
          //profesor
          this.cargarPackProfesor();
        }
        else {
          //supervisor
          this.cargarPack();  
        }
      }
    });
    modal.present();
  }
  gotoSemanasCliente(envoltorio){
    let modal = this.modalCtrl.create(SemanasClientePage, {envoltorio: envoltorio });
    modal.onDidDismiss(data => {
      // Data is your data from the modal
      if (data != undefined){
        //this.cargarProfesores();
        if (data.mensaje == 'volver'){
          var rolId = sessionStorage.getItem("ROL_ID");
          if (rolId == '3'){
            //profesor
            this.cargarPackProfesor();
          }
          else {
            //supervisor
            this.cargarPack();  
          }
        }
      }
    });
    modal.present();
  }
  abrirHorasCliente(pcoid){

    this.global.postClientePackProducto(pcoid).subscribe(
      data => {
        var datos = data.json();
        if (datos.Condiciones && datos.Condiciones.Id > 0) {
          //tiene acepta condiciones
          if (datos.CuposTomados) {
            if (datos.CuposTomados.length == datos.ProductoCodigo.CantidadClases) {
              //hay que derivarlo a otra pagina
              //seleccionar semanas cliente
              this.gotoSemanasCliente(datos);
            }
            else {
              //aca seguimos y enviamos a horas cliente
              this.gotoHorasCliente(datos);
            }
          }
          else {
            //aca seguimos y enviamos a horas cliente
            this.gotoHorasCliente(datos);
          }

        }
        else {
          //aca se debe enviar mensaje de que el cliente aún no ha 
          //aceptado condiciones

        }

      },
      err => console.error(err),
      () => console.log('get alumnos completed')
    );



  } 
}
