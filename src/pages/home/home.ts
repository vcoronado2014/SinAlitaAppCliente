import { Component } from '@angular/core';
import {NavController, Toast} from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { DetailPackPage } from '../../pages/detail-pack/detail-pack';

import { AuthService } from '../../app/Services/AuthService';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [AuthService]
})
export class HomePage {
  codigoCliente: string;
  isLogged: boolean;

  constructor(
    public navCtrl: NavController,
    private auth: AuthService,
    public toastCtrl: ToastController
  ) {

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

  goToDetails(id){
    this.navCtrl.push(DetailPackPage, {id: id });
  }
  Signup(){
    //validaciones
    if (!this.codigoCliente){
      let mi = this.presentToast('Nombre de usuario requerido', 'bottom', 4000);
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
          if (this.isLogged){
            this.navCtrl.push(DetailPackPage, {id: this.codigoCliente })
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
}
