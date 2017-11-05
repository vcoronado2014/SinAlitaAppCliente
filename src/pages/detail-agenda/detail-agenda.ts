import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import * as moment from 'moment';
import {AppSettings} from "../../../AppSettings";

/**
 * Generated class for the DetailAgendaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-detail-agenda',
  templateUrl: 'detail-agenda.html',
})
export class DetailAgendaPage {

  public idElemento;
  public arrCupos;
  public profesor;
  public nombreProfesor;
  public emailProfesor;
  public sexoProfesor;
  public fonoProfesor;
  public fotoProfesor;
  public infoProfesor;
  public arrAgenda;
  public codigoPack;
  public clasesAgendadas;

  constructor(
    private nav: NavController,
    private alert: AlertController,
    public loading: LoadingController,
    public toastCtrl: ToastController,
    private navParams: NavParams
  ) {

    moment.locale('es');
    this.idElemento = navParams.get('id');
    this.arrCupos= navParams.get('cupos');
    this.profesor= navParams.get('profesor');
    this.arrAgenda = [];
    this.clasesAgendadas = 0;
    this.codigoPack=navParams.get('codigoPack');

    let loader = this.loading.create({
      content: 'Cargando...',
    });

    loader.present().then(() => {
      //ahora si tiene profesor
      if (this.profesor.Id > 0){
        this.nombreProfesor = this.profesor.Nombres + ' ' +  this.profesor.PrimerApellido + ' ' + this.profesor.SegundoApellido;
        this.emailProfesor = this.profesor.Email;
        this.sexoProfesor = this.profesor.Sexo;
        this.fonoProfesor = this.profesor.TelefonosContacto;
        this.infoProfesor =  this.emailProfesor + ', ' + this.fonoProfesor;
        if (this.profesor.Fotografia == ''){
          this.fotoProfesor = AppSettings.URL_FOTOS + "img/no_foto.png";
        }
        else {
          this.fotoProfesor = AppSettings.URL_FOTOS + "img/" + this.profesor.Fotografia;
        }

      }
      else {
        //no hay profesor asignado aun
        this.nombreProfesor = 'No hay profesor asignado';
        this.fotoProfesor = AppSettings.URL_FOTOS + "img/no_foto.png";
        this.infoProfesor = '';
      }
      if (this.arrCupos){
        this.clasesAgendadas = this.arrCupos.length;
        for (var s in this.arrCupos){
          var fechaInicio = moment(this.arrCupos[s].FechaHoraInicio);
          var fechaTermino= moment(this.arrCupos[s].FechaHoraTermino);
          var diaMesInicio = fechaInicio.format("DD");
          var mesLargo = fechaInicio.format("MMMM");
          var diaSemanaCorto = fechaInicio.format("dd");
          var diaSemanaLargo = fechaInicio.format("dddd");
          var horaInicio = fechaInicio.format("HH:mm");
          var horaTermino = fechaTermino.format("HH:mm");
          var fechaCompleta = fechaInicio.format("DD-MM-YYYY");
          var anno = fechaTermino.format("YYYY");

          var estado;
          var cssItem = 'bg-pendiente';
          if (this.arrCupos[s].EstadoCupo == '0')
          {
            //esta creado pero no disponible
            estado = 'Creado';
          }
          if (this.arrCupos[s].EstadoCupo == '1')
          {
            //esta disponible
            estado = 'Disponible';
          }
          if (this.arrCupos[s].EstadoCupo == '2')
          {
            //esta creado pero no disponible
            estado = 'Asignada';
          }
          if (this.arrCupos[s].EstadoCupo == '3')
          {
            //esta terminado
            estado = 'Terminada';
            cssItem = 'bg-terminada';
          }
          var entidad = {
            DiaMesInicio: diaMesInicio,
            DiaSemanaCorto: diaSemanaCorto,
            HoraInicio: horaInicio,
            HoraTermino: horaTermino,
            FechaCompleta: fechaCompleta,
            Estado: estado,
            CssItem: cssItem,
            DiaSemanaLargo: diaSemanaLargo,
            MesLargo: mesLargo,
            Anno: anno
          };

          this.arrAgenda.push(entidad);


        }
      }

      loader.dismiss();
    });
  }


}
