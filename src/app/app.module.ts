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
import { AlumnoService } from '../app/Services/AlumnoService';
import { AceptaCondicionesService } from '../app/Services/AceptaCondicionesService';
import { GlobalService } from '../app/Services/GlobalService';

import { MyApp } from './app.component';
import { InicioPage } from '../pages/Inicio/inicio';
import { HomePage } from '../pages/home/home';
import { DetailPackPage } from '../pages/detail-pack/detail-pack';
import { DetailAgendaPage } from '../pages/detail-agenda/detail-agenda';
import { FichaAlumnoPage } from '../pages/ficha-alumno/ficha-alumno';
import { DetailsFichaPage } from '../pages/details-ficha/details-ficha';
import { CreaAlumnoPage } from '../pages/crea-alumno/crea-alumno';
import { AceptaCondicionesPage } from '../pages/acepta-condiciones/acepta-condiciones';
import { LoginPage } from '../pages/login/login';
import { SupervisorPage } from '../pages/supervisor/supervisor';
import { ClientesPage } from '../pages/clientes/clientes';
import { PacksPage } from '../pages/packs/packs';
import { ProfesoresPage } from '../pages/profesores/profesores';
import { EditarProfesorPage } from '../pages/editar-profesor/editar-profesor';
import { AsociarComunasPage } from '../pages/asociar-comunas/asociar-comunas';
import { EditarClientePage } from '../pages/editar-cliente/editar-cliente';
import { CrearPackPage } from '../pages/crear-pack/crear-pack';
import { ProfesorPage } from '../pages/profesor/profesor';
import { AgendaProfesorPage } from '../pages/agenda-profesor/agenda-profesor';
import { DetalleAgendaPage } from '../pages/detalle-agenda/detalle-agenda';
import { HorasClientePage } from '../pages/horas-cliente/horas-cliente';
import { InfoCuposPage } from '../pages/info-cupos/info-cupos';
import { AgendarHorasPage } from '../pages/agendar-horas/agendar-horas';
import { SemanasClientePage } from '../pages/semanas-cliente/semanas-cliente';
import { TarjetaProfesorPage } from '../pages/tarjeta-profesor/tarjeta-profesor';
import { TarjetaClientePage } from '../pages/tarjeta-cliente/tarjeta-cliente';
import { CancelarClasePage } from '../pages/cancelar-clase/cancelar-clase';

@NgModule({
  declarations: [
    MyApp,
    InicioPage,
    HomePage,
    DetailPackPage,
    DetailAgendaPage,
    FichaAlumnoPage,
    DetailsFichaPage,
    CreaAlumnoPage,
    AceptaCondicionesPage,
    LoginPage,
    SupervisorPage,
    ProfesoresPage,
    ClientesPage,
    PacksPage,
    EditarProfesorPage,
    AsociarComunasPage,
    EditarClientePage,
    CrearPackPage,
    ProfesorPage,
    AgendaProfesorPage,
    DetalleAgendaPage,
    HorasClientePage,
    InfoCuposPage,
    AgendarHorasPage,
    SemanasClientePage,
    TarjetaClientePage,
    TarjetaProfesorPage,
    CancelarClasePage,
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
    InicioPage,
    HomePage,
    DetailPackPage,
    DetailAgendaPage,
    DetailsFichaPage,
    FichaAlumnoPage,
    CreaAlumnoPage,
    LoginPage,
    SupervisorPage,
    AceptaCondicionesPage,
    ClientesPage,
    ProfesoresPage,
    EditarProfesorPage,
    AsociarComunasPage,
    EditarClientePage,
    CrearPackPage,
    ProfesorPage,
    AgendaProfesorPage,
    DetalleAgendaPage,
    HorasClientePage,
    InfoCuposPage,
    AgendarHorasPage,
    SemanasClientePage,
    TarjetaClientePage,
    TarjetaProfesorPage,
    CancelarClasePage,
    PacksPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AuthService,
    FichaAlumnoService,
    AlumnoService,
    AceptaCondicionesService,
    GlobalService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
