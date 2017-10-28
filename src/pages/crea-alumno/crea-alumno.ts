import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ToastController, ViewController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';

import { AlumnoService } from '../../app/Services/AlumnoService';

/**
 * Generated class for the CreaAlumnoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-crea-alumno',
  templateUrl: 'crea-alumno.html',
})
export class CreaAlumnoPage {
  //aca necesitamos
  //el id del cliente para buscar una lista de alumnos que tenga,
  //mostrarlos en un combo y que lo pueda usar
  alumnosArr =[];
  public tieneAlumnos;
  public clieId;
  //variables del formulario
  public idAlumno;
  public nombreCompleto;
  public edad;
  public sexo;

  public tieneAsma;
  public tieneProblemasCardiacos;
  public tieneProblemasMotores;

  public cualesProblemasCardiacos;
  public cualesProblemasMotores;
  public dondeAcudir;
  public numeroEmergencia;
  public observacion;
  public otraEnfermedad;

  pet: string = "puppies";


    constructor(
    private nav: NavController,
    private alert: AlertController,
    public loading: LoadingController,
    public toastCtrl: ToastController,
    private navParams: NavParams,
    private viewCtrl: ViewController,
    public alumnos: AlumnoService
  ) {

      this.clieId = navParams.get('clieId');
      this.tieneAlumnos = false;

      let loader = this.loading.create({
        content: 'Cargando...',
      });

      loader.present().then(() => {
        this.alumnos.getAlumnos(this.clieId).subscribe(
          data => {
            this.alumnosArr = data.json();
            if (this.alumnosArr.length > 0){
              this.tieneAlumnos = true;
            }


          },
          err => console.error(err),
          () => console.log('get alumnos completed')
        );



        loader.dismiss();
      });

  }
  guardar(){
      if (this.validar()){
        //todo ok.
        let mi = this.presentToast('correcto', 'bottom', 4000);
      }
  }

  close(){
    //aca hay que ir a la pagina anterior con push
    this.viewCtrl.dismiss();
  }
  validar(){
    if (this.nombreCompleto == undefined){
      let mi = this.presentToast('Nombre es requerido', 'bottom', 4000);
      return false;
    }
    if (this.edad == undefined){
      let mi = this.presentToast('Edad es requerida', 'bottom', 4000);
      return false;
    }
    if (this.sexo == undefined){
      let mi = this.presentToast('Sexo es requerido', 'bottom', 4000);
      return false;
    }
    if (this.dondeAcudir == undefined){
      let mi = this.presentToast('Donde acudir es requerido', 'bottom', 4000);
      return false;
    }
    if (this.numeroEmergencia == undefined){
      let mi = this.presentToast('Número teléfono es requerido', 'bottom', 4000);
      return false;
    }
    return true;
  }
  usar(item){
    if (item != undefined){
      //buscar
      //this.alumnosArr.find(this.encontrarAlumno(alumno, item));
      var alumno = this.encontrarAlumno(item);
      if (alumno){
        this.idAlumno = alumno.Id;

        this.nombreCompleto = alumno.NombreCompleto;
        this.edad = alumno.Edad;
        this.sexo = alumno.Sexo;
        if (alumno.TieneAsma == 1)
          this.tieneAsma = true;
        else
          this.tieneAsma = false;
        if (alumno.TieneProblemasCardiacos == 1)
          this.tieneProblemasCardiacos = true;
        else
          this.tieneProblemasCardiacos = false;
        if (alumno.TieneProblemasMotores == 1)
          this.tieneProblemasMotores = true;
        else
          this.tieneProblemasMotores = false;

        this.cualesProblemasCardiacos = alumno.CualesProblemasCardiacos;
        this.cualesProblemasMotores = alumno.CualesProblemasMotores;


        this.dondeAcudir = alumno.DondeAcudir;
        this.numeroEmergencia = alumno.NumeroEmergencia;
        this.observacion = alumno.Observacion;
        this.otraEnfermedad = alumno.OtraEnfermedad;

      }
    }
    else {
      //mensaje
      let mi = this.presentToast('Debe seleccionar un alumno', 'bottom', 4000);
    }

  }
  limpiar(){
    this.idAlumno = 0;

    this.nombreCompleto = "";
    this.edad="";
    this.sexo="";
    this.tieneAsma = false;
    this.tieneProblemasCardiacos = false;
    this.tieneProblemasMotores = false;

    this.cualesProblemasCardiacos = "";
    this.cualesProblemasMotores = "";


    this.dondeAcudir = "";
    this.numeroEmergencia = "";
    this.observacion = "";
    this.otraEnfermedad = "";

  }
  encontrarAlumno(id) {

    var alumno;
    if (this.alumnosArr){
      for (var i in this.alumnosArr){
        if (this.alumnosArr[i].Id == id){
          alumno = this.alumnosArr[i];
        }
      }
    }

    return alumno;
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
