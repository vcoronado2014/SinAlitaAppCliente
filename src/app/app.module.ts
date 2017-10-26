import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';
import { NgCalendarModule } from 'ionic2-calendar';
import { ChartModule } from 'angular2-highcharts';
import * as highcharts from 'Highcharts';
import { TextAvatarDirective } from '../directives/text-avatar/text-avatar';

import { AuthService } from '../app/Services/AuthService';
import { FichaAlumnoService } from '../app/Services/FichaAlumnoService';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { DetailPackPage } from '../pages/detail-pack/detail-pack';
import { DetailAgendaPage } from '../pages/detail-agenda/detail-agenda';
import { FichaAlumnoPage } from '../pages/ficha-alumno/ficha-alumno';
import { DetailsFichaPage } from '../pages/details-ficha/details-ficha';
import { CreaAlumnoPage } from '../pages/crea-alumno/crea-alumno';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    DetailPackPage,
    DetailAgendaPage,
    FichaAlumnoPage,
    DetailsFichaPage,
    CreaAlumnoPage,
    TextAvatarDirective
  ],
  imports: [
    BrowserModule,
    HttpModule,
    NgCalendarModule,
    ChartModule.forRoot(highcharts),
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    DetailPackPage,
    DetailAgendaPage,
    DetailsFichaPage,
    FichaAlumnoPage,
    CreaAlumnoPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AuthService,
    FichaAlumnoService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
