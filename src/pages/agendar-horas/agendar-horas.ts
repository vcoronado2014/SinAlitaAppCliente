import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ToastController, ViewController, LoadingController, ModalController  } from 'ionic-angular';

import { GlobalService } from '../../app/Services/GlobalService';
import * as moment from 'moment';
import { isPresent } from 'ionic-angular/umd/util/util';

import { TarjetaClientePage } from '../../pages/tarjeta-cliente/tarjeta-cliente';
import { TarjetaProfesorPage } from '../../pages/tarjeta-profesor/tarjeta-profesor';

/**
 * Generated class for the AgendarHorasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-agendar-horas',
  templateUrl: 'agendar-horas.html',
})
export class AgendarHorasPage {
cupoCompleto;
myDate;
maxDate;
minDate;
semanasMostrar = [];
semanasDisponibles = 0;
seleccionadas = 0;
selectedArray :any = [];
programadas = 0;
cliente;
productoCodigo;
cuposTomados;

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
    this.cupoCompleto =  navParams.get('info');
    //esta variable se sobrescribe mas adelante
    this.programadas = navParams.get('cantidadClases');
    //************************************************** */
    this.cliente =  navParams.get('cliente');
    this.productoCodigo =  navParams.get('productoCodigo');
    this.cuposTomados = navParams.get('cuposTomados');
    console.log(this.productoCodigo);
    //CALCULAMOS LAS FECHAS
    this.myDate = moment().toISOString();
    if (this.cupoCompleto.CuposProfesor && this.cupoCompleto.CuposProfesor.length > 20){
      var mitadCupos = this.cupoCompleto.CuposProfesor.length / 1.5;
      var cupoInicial = this.cupoCompleto.CuposProfesor[0];
      var cupoFinal = this.cupoCompleto.CuposProfesor[parseInt(mitadCupos.toString())];
      this.minDate = moment(cupoInicial.FechaHoraInicio).toISOString();
      this.maxDate = moment(cupoFinal.FechaHoraTermino).toISOString();
    }
    else {
      //no hay cupos disponibles
      this.minDate = moment().toISOString();
      this.maxDate = moment().toISOString();
    }
    //ojo con esto, puede que le falten clases por agendar
    if (this.cuposTomados && this.cuposTomados.length > 0){
      var totalClases = navParams.get('cantidadClases');
      this.programadas = totalClases - this.cuposTomados.length;
    }

  }
  buscarEnCupos(semana) {
    var arrDevolver = [];
    if (this.cupoCompleto.CuposProfesor.length) {
      this.cupoCompleto.CuposProfesor.forEach(cupo => {
        var fechaIni = moment(cupo.FechaHoraInicio);
        var fechaTer = moment(cupo.FechaHoraTermino);
        if (fechaIni >= moment(semana.FechaInicioSemana) && fechaTer <= moment(semana.FechaTerminoSemana)){
          //aca hay que evaluar la fecha actual para habilitar o no el elemento agregando 3 horas
          arrDevolver.push(cupo);
        }

      });
    }
    return arrDevolver;
  }
  verificaSiExisteElemento(arreglo, elemento){
    var retorno = false;
    if (arreglo){
      arreglo.forEach(element => {
        if (element.getTime() == elemento.getTime()){
          retorno = true;
          return;
        }
        
      });
    }
    return retorno;
  }
  verificaSiExiste(arreglo, elemento){
    var retorno = false;
    if (arreglo){
      arreglo.forEach(element => {
        if (element == elemento){
          retorno = true;
          return;
        }
        
      });
    }
    return retorno;
  }
  procesarSemanasFinal(semanas, cupos){
    var contadorSemanas = 0;
    var arrDevolver = [];
    if (semanas){

      semanas.forEach(dia => {
        var entidad = {
          Dia: new Date(),
          DiaString: '',
          Cupos: []
        }
        //dia.Cupos = [];
        var fecha = moment(dia);
        var fechita = new Date(fecha.year(), fecha.month(), fecha.date(), 0,0,0,0);
        entidad.Dia = fechita;
        entidad.DiaString = moment(fechita).format("dddd, D MMMM");
        cupos.forEach(cupo => {
          var fechaCupo = moment(cupo.FechaHoraInicio);
          if (fechaCupo.date() == fecha.date() && fechaCupo.month() == fecha.month() && fechaCupo.year() == fecha.year()){
            cupo.HoraInicio = moment(cupo.FechaHoraInicio).format("HH:mm");
            cupo.HoraTermino = moment(cupo.FechaHoraTermino).format("HH:mm");
            if (cupo.ClieId > 0){
              cupo.EsSeleccionado = true;
              cupo.EsBloqueado = true;
            }
            else {
              cupo.EsSeleccionado = false;
              cupo.EsBloqueado = false;
            }
            //ahora agregamos el cupo
            //dia.Cupos.push(cupo);
            entidad.Cupos.push(cupo);
          }
          
        });
        arrDevolver.push(entidad);
      });
    }
    return arrDevolver;
  }
  agruparCuposPorDias(cupos) {
    var arrDias = [];

    if (cupos.length > 0) {


      cupos.forEach(cupo => {
        //obtenemos el dia del cupo
        var fechaCupoInicio = moment(cupo.FechaHoraInicio);
        var date = new Date(fechaCupoInicio.year(), fechaCupoInicio.month(), fechaCupoInicio.date(), 0,0,0,0);

        //var dia = fechaCupoInicio.day();
        if(!this.verificaSiExisteElemento(arrDias, date)){
          arrDias.push(date);
        }


      });

    }
    return arrDias;
  }

  procesarSemanas(){
    this.semanasMostrar = [];
    if(this.cupoCompleto.SemanasArr && this.cupoCompleto.SemanasArr.length > 0){
      this.cupoCompleto.SemanasArr.forEach(semana => {
        //tomamos los valores
        var fechaIniComparar = moment(semana.FechaInicioSemana);
        var fechaTerComparar = moment(semana.FechaTerminoSemana);
        var fechaSeleccionada = moment(this.myDate);
        if (fechaSeleccionada < fechaTerComparar){
          //antes de agregar buscamos dentro de los cupos los que corresponden a las semanas seleccionadas
          semana.Cupos = [];
          semana.Cupos = this.buscarEnCupos(semana);
          //var dias = this.groupBy(semana.Cupos, 'FechaHoraInicio');
          //agregamos al arreglo
          var semanasProcesadas = this.agruparCuposPorDias(semana.Cupos);
          //ahora que las semanas estan procesadas asociamos los cupos que corresponden a cada semana
          var nuevaSemana = this.procesarSemanasFinal(semanasProcesadas, semana.Cupos);
          semana.Agendas = [];
          semana.Agendas.push(nuevaSemana);
          this.semanasMostrar.push(semana);
          return;
        }


      });
    }
    var contador = 0;
    if (this.semanasMostrar.length > 0){
      this.semanasMostrar.forEach(element => {
        if (element.Agendas[0].length > 0){
            contador++;
        }
        
      });
    }
    this.semanasDisponibles = contador;

    console.log(this.semanasMostrar);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad AgendarHorasPage');
  }
  cancel(){
    this.viewCtrl.dismiss();
  }
  showAlertProfesor() {
    var profesor = this.cupoCompleto.Profesor;
    profesor.NombreCompleto = profesor.Nombres + ' ' + profesor.PrimerApellido + ' ' + profesor.SegundoApellido;
    let modal = this.modalCtrl.create(TarjetaProfesorPage, { profesor: profesor });
    modal.onDidDismiss(data => {
      // Data is your data from the modal
      if (data != undefined) {
        //this.cargarProfesores();
      }
    });
    modal.present();
  }
  showAlertCliente() {
    var cliente = this.cliente;
    cliente.NombreCompleto = cliente.Nombres + ' ' + cliente.PrimerApellido + ' ' + cliente.SegundoApellido;

    let modal = this.modalCtrl.create(TarjetaClientePage, { cliente: cliente });
    modal.onDidDismiss(data => {
      // Data is your data from the modal
      if (data != undefined) {
        //this.cargarProfesores();
      }
    });
    modal.present();

  }
  selectMember(data) {
    //hay que hacer otras validaciones
    //no puede seleccionar mas de 2º horas el mismo dia,
    //no puede seleccionar mas del tope de clases
    if (data.EsSeleccionado == true) {
      this.selectedArray.push(data);
    } else {
      let newArray = this.selectedArray.filter(function (el) {
        return el.Id !== data.Id;
      });
      this.selectedArray = newArray;
    }
    console.log(this.selectedArray);
    this.seleccionadas = this.selectedArray.length;
    if (this.seleccionadas > this.programadas) {
      let sms = this.presentToast('Tiene más horas seleccionadas de las programadas', 'bottom', 4000);
    }

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
  entregaCuposMismoDia(fechaEvaluar){
    var contador = 0;
    this.selectedArray.forEach(cupo => {
      var fechaCupo = moment(cupo.FechaHoraInicio);
      if (fechaCupo.year() == fechaEvaluar.year() && fechaCupo.month() == fechaEvaluar.month() && fechaCupo.date() == fechaEvaluar.date()){
        contador++;
      }
    });
    return contador;
  }
  guardar(){
    //aca debemos procesar la informacion antes de guardarla
    //verificar si hay mas elementos selccionados
    //verificar que no hayan mas de 3 clases por ejemplo
    //creamos un arreglo de errores
    var erroresArr = [];
    var idsArr = [];
    var retorno;
    
    if (this.selectedArray.length > 0){
      if (this.seleccionadas == this.programadas){
        this.selectedArray.forEach(cupo => {

          var fechaCupo = moment(cupo.FechaHoraInicio);
          var cuposMismoDia = this.entregaCuposMismoDia(fechaCupo);
          if (cuposMismoDia > 2){
            if (!this.verificaSiExiste(erroresArr, 'Cupos mismo día')){
              erroresArr.push('Cupos mismo día');
            }
            
          }
          idsArr.push(cupo.Id);
        });
        if (erroresArr.length > 0) {
          //no puede guardar agenda
          let sms = this.presentToast(erroresArr[0], 'bottom', 4000);
        }
        else {
          //YA SE PUEDE GUARDAR
          var clieId = this.cliente.Id;
          var profId = this.cupoCompleto.Profesor.Id;
          var pcoId = this.productoCodigo.Id;
          var arrCupos = idsArr.toString();
          var nombreCliente = this.cliente.Nombres + ' ' + this.cliente.PrimerApellido;
          let loader = this.loading.create({
            content: 'Cargando Profesor...',
          });
      
          loader.present().then(() => {
            this.global.putCupos(
              clieId,
              pcoId,
              profId,
              arrCupos,
              nombreCliente
            ).subscribe(
              data => {
                var datos = data.json();
                if (datos) {
                  retorno = datos;
                }
              },
              err => {
                console.error(err);
                let toast = this.presentToast("Error al guardar los cupos", "top", 4000);
                loader.dismiss();
              },
              () => {
                console.log('save completed');
                let toast = this.presentToast("Cupos guardados con éxito", "top", 3000);
                //ProfesoresPage.cargarProfesores();
                loader.dismiss();
                //volvemos a la página anterior
                this.viewCtrl.dismiss({ mensaje: 'volver' });
              }
            );
          });
        }
      
      }
      else {
        var dif = 0;
        if (this.seleccionadas > this.programadas) {
          dif = this.seleccionadas - this.programadas;
          let sms = this.presentToast('Tiene ' + dif + ' cupos más.', 'bottom', 4000);
        }
        else {
          dif = this.programadas - this.seleccionadas;
          let sms = this.presentToast('Le faltan ' + dif + ' cupos por seleccionar.', 'bottom', 4000);
        }

      }

    }
    else {
      let sms = this.presentToast('Debe seleccionar cupos antes de guardar', 'bottom', 4000);

    }
  }
}
