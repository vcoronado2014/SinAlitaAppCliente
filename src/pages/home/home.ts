import { Component } from '@angular/core';
import {NavController, Toast, NavParams} from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { DetailPackPage } from '../../pages/detail-pack/detail-pack';
//para redes sociales
import { AppAvailability } from '@ionic-native/app-availability';
import { Platform } from 'ionic-angular';

import { AuthService } from '../../app/Services/AuthService';
import {AppSettings} from "../../config/AppSettings";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [AuthService, AppAvailability]
})
export class HomePage {
  codigoCliente: string;
  isLogged: boolean;
  envoltorio: any;
  icono;
  //para las redes sociales
  public scheme: String;
  public isApp;
  public urlFacebook;
  public urlInstagram;
  public urlFun;

  constructor(public navCtrl: NavController,
              private navParams: NavParams,
              public auth: AuthService,
              public toastCtrl: ToastController,
              public appAvailability: AppAvailability,
              public platform: Platform) {

    this.icono = AppSettings.URL_FOTOS + 'img/sinalitas.png';
    this.urlFacebook = AppSettings.URL_FACEBOOK;
    this.urlInstagram = AppSettings.URL_INSTAGRAM;
    this.urlFun = AppSettings.URL_FUN;
    if (this.navParams.get('codigoCliente') != null) {
      this.codigoCliente = this.navParams.get('codigoCliente');
    }

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

  goToDetails(id) {
    this.envoltorio = this.auth.envoltorio;
    this.navCtrl.push(DetailPackPage, {id: id});
  }

  Signup() {
    //validaciones
    if (!this.codigoCliente) {
      let mi = this.presentToast('Código de Pack requerido', 'bottom', 4000);
      return;
    }

    this.auth.Post(this.codigoCliente)
      .subscribe(
        rs => this.isLogged = rs,
        er => {
          //console.log(error)
          let mi = this.presentToast('No existe información', 'bottom', 4000);

        },
        () => {
          if (this.isLogged) {
            this.envoltorio = this.auth.envoltorio;
            this.navCtrl.push(DetailPackPage, {id: this.codigoCliente, envoltorio: this.envoltorio})
              .then(data => console.log(data),
                error => {
                  //console.log(error)
                  let mi = this.presentToast(error, 'bottom', 4000);
                }
              );
          } else {
            //incorrecto
            console.log('Error');
            let mi = this.presentToast('Código no exite', 'bottom', 4000);
          }

        }
      )

  }

  isIOS() {
    if (this.platform.is('ios')) {
      return true;
    } else {
      return false;
    }
  }

  isAndroid() {
    if (this.platform.is('android')) {
      return true;
    } else {
      return false;
    }
  }

  findSchemeTwitter() {
    if (this.isIOS()) {
      this.scheme = 'twitter://';
      return this.scheme;
    } else if (this.isAndroid()) {
      this.scheme = 'com.twitter.android';
      return this.scheme;
    }
  }
  findSchemeFacebook() {
    if (this.isIOS()) {
      this.scheme = 'fb://';
      return this.scheme;
    } else if (this.isAndroid()) {
      this.scheme = 'com.facebook.katana';
      return this.scheme;
    }
  }

}
