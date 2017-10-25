import { Component, ViewChild  } from '@angular/core';
import { List } from 'ionic-angular';
import { NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { DetailAgendaPage } from '../../pages/detail-agenda/detail-agenda';
import { HomePage } from '../../pages/home/home';
import { FichaAlumnoPage } from '../../pages/ficha-alumno/ficha-alumno';

import * as moment from 'moment';

/**
 * Generated class for the DetailPackPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-detail-pack',
  templateUrl: 'detail-pack.html'
})
export class DetailPackPage {
  @ViewChild('myList', {read: List}) list: List;
  //@ViewChild('item') slidingItem: ItemSliding;

  public idElemento;
  public envoltorio;
  public clasesAgendadas;
  public nombreProfesor;
  public emailProfesor;
  public sexoProfesor;
  public fonoProfesor;
  public fotoProfesor;
  public nombreCliente;
  public direccionCliente;
  public comunaCliente;
  public telefonosCliente;
  public fechaPack;
  public infoProfesor;
  public cantidadAlumnos;
  public fichaAlumnos;
  public idPack;

  constructor(
    private nav: NavController,
    private alert: AlertController,
    public loading: LoadingController,
    public toastCtrl: ToastController,
    private navParams: NavParams
  ) {
      this.idElemento = navParams.get('id');
      this.envoltorio = navParams.get('envoltorio');
      this.clasesAgendadas = 0;

      this.nombreProfesor = '';
      this.emailProfesor = '';
      this.sexoProfesor = '';
      this.fonoProfesor = '';
      this.fotoProfesor = '';
      //cliente
      this.nombreCliente= '';
      this.direccionCliente= '';
      this.comunaCliente= '';
      this.telefonosCliente= '';
      this.infoProfesor='';

      this.fechaPack = '';
      this.fichaAlumnos= [];
      this.idPack = 0;

    //this.list.closeSlidingItems();

    let loader = this.loading.create({
      content: 'Cargando...',
    });

    loader.present().then(() => {
      //aca las llamadas ajax
/*      this.listarTipoMovimientos();
      this.recuperarRendicion(this.rendicion.Id);*/

      //se deben profesar ciertos parametros
      //1. si tiene o no acepta condiciones, si tiene todo bien de lo contrario se va a la pagina de acepta condiciones
      if (this.envoltorio){
        //el identificador del pack
        this.idPack = this.envoltorio.ProductoCodigo.Id;
        //tiene acepta condiciones
        if (this.envoltorio.TieneAceptaCondiciones){
          //tiene acepta condiciones
          //ahora si tiene cupos
/*          if (this.envoltorio.Cupos.length > 0){
            this.clasesAgendadas = this.envoltorio.Cupos.length;
          }*/
          this.cantidadAlumnos = this.envoltorio.ProductoCodigo.CantidadAlumnos;
          this.clasesAgendadas = this.envoltorio.ProductoCodigo.CantidadClases;
          //ahora si tiene profesor
          if (this.envoltorio.Profesor.Id > 0){
            this.nombreProfesor = this.envoltorio.Profesor.Nombres + ' ' +  this.envoltorio.Profesor.PrimerApellido + ' ' + this.envoltorio.Profesor.SegundoApellido;
            this.emailProfesor = this.envoltorio.Profesor.Email;
            this.sexoProfesor = this.envoltorio.Profesor.Sexo;
            this.fonoProfesor = this.envoltorio.Profesor.TelefonosContacto;
            this.infoProfesor =  this.emailProfesor + ', ' + this.fonoProfesor;
            if (this.envoltorio.Profesor.Fotografia == ''){
              this.fotoProfesor = "../../assets/img/no_foto.png";
            }
            else {
              this.fotoProfesor = this.envoltorio.Profesor.Fotografia;
            }

          }
          else {
            //no hay profesor asignado aun
            this.nombreProfesor = 'No hay profesor asignado';
            this.fotoProfesor = "../../assets/img/no_foto.png";
            this.infoProfesor = '';
          }
          //cliente
          if (this.envoltorio.Cliente.Id > 0){
            this.nombreCliente = this.envoltorio.Cliente.Nombres + ' ' +  this.envoltorio.Cliente.PrimerApellido + ' ' + this.envoltorio.Cliente.SegundoApellido;
            this.direccionCliente = this.envoltorio.Cliente.Direccion;
            this.comunaCliente = this.envoltorio.ComunaCliente.Nombre;
            this.telefonosCliente = this.envoltorio.Cliente.TelefonosContacto;
          }
          //fecha creacion
          let fecha = moment(this.envoltorio.ProductoCodigo.FechaCreacion).format('DD-MM-YYYY HH:MM');
          this.fechaPack = fecha;

        }
        else{
          //enviar a la pagina de acpeta condiciones con nav.push

        }
        //ficha Alumnos
        if (this.envoltorio.FichaAlumnos){
          this.fichaAlumnos = this.envoltorio.FichaAlumnos;
        }
      }
      else {
        //redirect a home
        nav.setRoot(HomePage);
      }



      loader.dismiss();
    });
  }
  goToDetails(id){
    this.nav.push(DetailAgendaPage, {id: id });
  }
  goToFichaAlumno(){
    this.nav.push(FichaAlumnoPage, {fichaAlumnos: this.fichaAlumnos, cantidadAlumnos: this.cantidadAlumnos, idPack: this.idPack });
    //acá cerramos el slide
    this.list.closeSlidingItems();
  }

}
