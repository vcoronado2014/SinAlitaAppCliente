import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LocalNotifications } from '@ionic-native/local-notifications';

import { HomePage } from '../pages/home/home';
import {AppSettings} from "../config/AppSettings";
import { InicioPage } from "../pages/inicio/inicio";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage:any = InicioPage;
  pages: Array<{title: string, component: any}>;
  imgPrincipal;
  timeOut=50000;
  timerInterval: any;
  //variable para sms
  data = { title:'', description:'', date:'', time:'' };
  constructor(
    public platform: Platform, 
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen,
    public localNotifications: LocalNotifications,
    public alertCtrl: AlertController
  ) {
    //this.activarTimer();
    var paginaUno = {title: 'Inicio', component: InicioPage, visible: true };
    this.imgPrincipal = AppSettings.URL_FOTOS + "img/agua.jpg";


    this.pages = [
      paginaUno
    ]

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      this.startTiming(true);
    });
  }
  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
  activarTimer(){
    setTimeout(() => {

      //iniciamos el timer
      // somecode
    }, this.timeOut);
  }
  setSound() {
    if (this.platform.is('android')) {
      return 'file://assets/sounds/Rooster.mp3'
    } else {
      return 'file://assets/sounds/Rooster.caf'
    }
  }
  submit() {
    console.log(this.data);
    //var date = new Date(this.data.date+" "+this.data.time);
    var date = new Date();
    console.log(date);
    this.localNotifications.schedule({
       text: 'Delayed ILocalNotification',
       at: date,
       led: 'FF0000',
       sound: this.setSound(),
    });
    let alert = this.alertCtrl.create({
      title: 'Congratulation!',
      subTitle: 'Notification setup successfully at '+date,
      buttons: ['OK']
    });
    alert.present();
    this.data = { title:'', description:'', date:'', time:'' };
  }

  startTiming(restarting): void {


    this.timerInterval = setInterval(() => {

      let now = new Date();
      //let timeDifference = now.getTime() - project.lastChecked.getTime();
      //let seconds = timeDifference / 1000;
            //ACA DEBEMOS TRAERNOS DESDE LOCAL STORAGE LA INFO
      //DE QUIEN SE ENCUENTRA LOGUEADO PARA IR A REVISAR 
      //LAS NOTIFICACIONES
      var profId = localStorage.getItem("PROF_ID");
      var clieId = localStorage.getItem("CLIE_ID");
      if (profId != null && profId != ""){
        console.log('push profe');
        this.submit();
      }
      if (clieId != null && clieId != ""){
        console.log('push cliente');
      }
      //console.log('timer');

    }, this.timeOut);
  }

  stopTiming() {

    clearInterval(this.timerInterval);
    this.timerInterval = false;

  }
}

