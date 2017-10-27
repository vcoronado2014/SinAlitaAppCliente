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

  close(){
    //aca hay que ir a la pagina anterior con push
    this.viewCtrl.dismiss();
  }
}
