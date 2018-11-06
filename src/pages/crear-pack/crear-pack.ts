import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ToastController, ViewController, LoadingController, ModalController  } from 'ionic-angular';

import { GlobalService } from '../../app/Services/GlobalService';

import * as moment from 'moment';

/**
 * Generated class for the CrearPackPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-crear-pack',
  templateUrl: 'crear-pack.html',
})
export class CrearPackPage {

  cliente;
  productosArr=[];
  producto;
  productoSeleccionado;
  ultimoId;
  codigoCliente;
  cantidadAlumnosArr=[];
  cantidadClasesArr=[];
  precioPack;
  descuento=0;
  totalPack=0;
  cantidadClases;
  cantidadAlumnos;

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
    this.cliente =  navParams.get('cliente');
    this.cargarProductos();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CrearPackPage');
  }
  cancel(){
    this.viewCtrl.dismiss();
  }
  setearProducto(event){
    this.producto = event;
    //info del producto
    //var prod = this.producto;
  }
  cargarCantidadAlumnos(item){
    this.cantidadAlumnosArr = [];
    var entidadUno = {
      valor: 1,
      texto: '1'
    };
    var entidadDos = {
      valor: 2,
      texto: '2'
    };
    var entidadTres = {
      valor: 3,
      texto: '3'
    };
    var entidadCuatro = {
      valor: 4,
      texto: '4'
    };
    if (item.CantidadAlumnos == 2){
      this.cantidadAlumnosArr.push(entidadUno);
      this.cantidadAlumnosArr.push(entidadDos);
    }
    if (item.CantidadAlumnos == 3){
      this.cantidadAlumnosArr.push(entidadUno);
      this.cantidadAlumnosArr.push(entidadDos);
      this.cantidadAlumnosArr.push(entidadTres);
    }
    if (item.CantidadAlumnos == 4){
      this.cantidadAlumnosArr.push(entidadUno);
      this.cantidadAlumnosArr.push(entidadDos);
      this.cantidadAlumnosArr.push(entidadTres);
      this.cantidadAlumnosArr.push(entidadCuatro);
    }


  }
  cargarCantidadClases(item){
    this.cantidadClasesArr = [];

    var entidadCuatro = {
      valor: 4,
      texto: '4'
    };
    var entidadCinco = {
      valor: 5,
      texto: '5'
    };
    var entidadSeis = {
      valor: 6,
      texto: '6'
    };
    var entidadSiete = {
      valor: 7,
      texto: '7'
    };
    var entidadOcho = {
      valor: 8,
      texto: '8'
    };
    var entidadNueve = {
      valor: 9,
      texto: '9'
    };
    var entidadDiez = {
      valor: 10,
      texto: '10'
    };
    var entidadOnce = {
      valor: 11,
      texto: '11'
    };
    var entidadDoce = {
      valor: 12,
      texto: '12'
    };
    var entidadTrece = {
      valor: 13,
      texto: '13'
    };
    if (item.TopeClases == 9){
      this.cantidadClasesArr.push(entidadCuatro);
      this.cantidadClasesArr.push(entidadCinco);
      this.cantidadClasesArr.push(entidadSeis);
      this.cantidadClasesArr.push(entidadSiete);
      this.cantidadClasesArr.push(entidadOcho);
      this.cantidadClasesArr.push(entidadNueve);
    }
    if (item.TopeClases == 13){
      this.cantidadClasesArr.push(entidadCuatro);
      this.cantidadClasesArr.push(entidadCinco);
      this.cantidadClasesArr.push(entidadSeis);
      this.cantidadClasesArr.push(entidadSiete);
      this.cantidadClasesArr.push(entidadOcho);
      this.cantidadClasesArr.push(entidadNueve);
      this.cantidadClasesArr.push(entidadDiez);
      this.cantidadClasesArr.push(entidadOnce);
      this.cantidadClasesArr.push(entidadDoce);
      this.cantidadClasesArr.push(entidadTrece);

    }



  }
  selectProducto(item){
    this.productoSeleccionado = item;
    var cod = '';
    var arr = this.productoSeleccionado.Nombre.split(' ');
    if (arr){
      for(var i=0; i<=arr.length; i++){
        if (arr[i]){
          cod += arr[i];
        }
      }
    }
    
    this.codigoCliente = this.ultimoId.toString() + '-' + cod;
    this.cargarCantidadAlumnos(this.productoSeleccionado);
    this.cargarCantidadClases(this.productoSeleccionado);
    //precio del pack
    this.precioPack = this.productoSeleccionado.Precio;
    if (this.descuento > 0){
      if (this.descuento < this.totalPack) {
        this.totalPack = this.precioPack - this.descuento;
      }
    }
    else{
      this.totalPack = this.precioPack;
    }
    
  }
  recalcularPrecio(){
    if (this.descuento > 0){
      if (this.descuento < this.totalPack) {
        this.totalPack = this.precioPack - this.descuento;
      }
    }
    else{
      this.totalPack = this.precioPack;
    }
  }
  cargarProductos() {
    let loader = this.loading.create({
      content: 'Cargando...',
    });
    loader.present().then(() => {
      this.global.postProductos().subscribe(
        data => {
          var datos = data.json();
          this.productosArr = datos.Productos;
          this.ultimoId = datos.UltimoId;
        },
        err => console.error(err),
        () => console.log('get productos completed')
      );
      loader.dismiss();
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
  guardarPack(){

    let loader = this.loading.create({
      content: 'Guardando Pack...',
    });

    loader.present().then(() => {

      var idCliente = this.cliente.Id;

      if (!this.producto  || this.producto == ""){
        let toast = this.presentToast("Producto requerido", "bottom", 2000);
        loader.dismiss();
        return;
      }
      if (!this.cantidadClases  || this.cantidadClases == ""){
        let toast = this.presentToast("Cantidad Clases requerido", "bottom", 2000);
        loader.dismiss();
        return;
      }
      if (!this.cantidadAlumnos  || this.cantidadAlumnos == ""){
        let toast = this.presentToast("Cantidad Alumnos requerido", "bottom", 2000);
        loader.dismiss();
        return;
      }
      if (!this.precioPack  || this.precioPack == ""){
        let toast = this.presentToast("Precio requerido", "bottom", 2000);
        loader.dismiss();
        return;
      }

      if (!this.totalPack  || this.totalPack == 0){
        let toast = this.presentToast("Total Pack debe ser mayor a cero", "bottom", 2000);
        loader.dismiss();
        return;
      }
      if (!this.codigoCliente  || this.codigoCliente == ""){
        let toast = this.presentToast("Código cliente requerido", "bottom", 2000);
        loader.dismiss();
        return;
      }


      this.global.putProductoCodigo(
        idCliente,
        this.codigoCliente,
        this.producto,
        this.cantidadClases,
        this.descuento,
        this.totalPack,
        this.cantidadAlumnos
      ).subscribe(
        data => {
          var datos = data.json();
          /*
          if (datos){
            datos.forEach(element => {
              element.NombreCompleto = element.Nombres.trim() + ' ' + element.PrimerApellido.trim() + ' ' + element.SegundoApellido.trim();
            });
          }
          */
          //this.clientes = datos;
          //this.todasLosClientes = this.clientesArr;
        },
        err => {
          console.error(err);
          let toast = this.presentToast("Error al guardar producto", "top", 2000);
          loader.dismiss();
        },
        () => {
          console.log('save completed');
          let toast = this.presentToast("Pack guardado con éxito", "top", 2000);
          //ProfesoresPage.cargarProfesores();
          loader.dismiss();
          //volvemos a la página anterior
          this.viewCtrl.dismiss();
        }
      );



    });

  }  
  
}
