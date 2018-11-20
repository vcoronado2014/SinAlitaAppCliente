import { Component } from '@angular/core';
import {NavController, Toast, NavParams, LoadingController} from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { DetailPackPage } from '../../pages/detail-pack/detail-pack';
import { HomePage } from '../../pages/home/home';
//import { InicioPage } from '../../pages/inicio/inicio';
import { SupervisorPage } from '../../pages/supervisor/supervisor';
import { ProfesorPage } from '../../pages/profesor/profesor';
//para redes sociales
import { AppAvailability } from '@ionic-native/app-availability';
import { Platform } from 'ionic-angular';

import { AuthService } from '../../app/Services/AuthService';
import { GlobalService } from '../../app/Services/GlobalService';
import {AppSettings} from "../../config/AppSettings";

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [AuthService, AppAvailability]
})
export class LoginPage {
  //usuario = "18538653-8";
  //clave = "18538653-8";
  usuario = "";
  clave = "";
  isLogged: boolean;

  constructor(public navCtrl: NavController,
    private navParams: NavParams,
    public auth: AuthService,
    public toastCtrl: ToastController,
    public loading:LoadingController,
    public appAvailability: AppAvailability,
    public global: GlobalService,
    public platform: Platform) {

  }
  Signup() {
    //validaciones
    if (!this.usuario) {
      let mi = this.presentToast('Usuario Requerido', 'bottom', 4000);
      return;
    }
    if (!this.clave) {
      let mi = this.presentToast('Clave Requerida', 'bottom', 4000);
      return;
    }

    let loader = this.loading.create({
      content: 'Autentificando...',
    });
    loader.present().then(() => {
      this.global.Post(this.usuario, this.clave)
      .subscribe(
        rs => {
          this.isLogged = rs
        },
        er => {
          //console.log(error)
          loader.dismiss();
          let mi = this.presentToast('No existe información', 'bottom', 4000);

        },
        () => {
          //esta todo ok, cerramos loading
          loader.dismiss();
          if (this.isLogged) {
            //console.log(this.global.persona);
            if (this.global.envoltorio){
              if (this.global.envoltorio.RolId == 2){
                this.navCtrl.push(SupervisorPage);
              }
              if (this.global.envoltorio.RolId == 3){
                this.navCtrl.push(ProfesorPage);
              }
            }


          } else {
            //incorrecto
            console.log('Error');
            let mi = this.presentToast('Usuario no exite', 'bottom', 4000);
          }

        }
      )
    });

  }
  presentToast = function (mensaje, posicion, duracion) {
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
  goBack(){
    //this.navCtrl.setRoot(InicioPage);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
