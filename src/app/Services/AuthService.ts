/**
 * Created by vcoronado on 13-07-2017.
 */
import { Injectable, Component } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { AppSettings } from '../../../AppSettings'

import 'rxjs/add/operator/map';

@Injectable()
export class AuthService{
  codigoCliente: string;
  loggedIn:boolean;

  constructor(
    private http: Http
  ){
    //inicializamos los valores
    this.codigoCliente = '';
    this.loggedIn = false;
  }

  Post(codigoCliente){
    let url = AppSettings.URL_API + 'Envoltorio';
    //let url = 'http://api.asambleas.cl/api/login';

    let iJson = JSON.stringify({Nombre: codigoCliente});

    return this.http.post(url, iJson, {
      headers: new Headers({'Content-Type': 'application/json'})
    })
      .map(res => res.text())
      .map(res => {
          if (res == "error" || res == "nofound"){
            this.loggedIn = false;
          } else {
            //localStorage.setItem('user_id', res.AutentificacionUsuario.Id);
            //this.username = res.AutentificacionUsuario.NombreUsuario;
            //vamos a dividir el retorno
            let retorno = JSON.parse(res);

/*            sessionStorage.setItem('USU_ID', retorno.AutentificacionUsuario.Id);
            sessionStorage.setItem('ROL_ID', retorno.Rol.Id);
            sessionStorage.setItem('ROL_NOMBRE', retorno.Rol.Nombre);
            sessionStorage.setItem('INST_ID', retorno.Institucion.Id);
            sessionStorage.setItem('INSTITUCION_NOMBRE', retorno.Institucion.Nombre);
            sessionStorage.setItem('PERSONA_NOMBRE', retorno.Persona.Nombres + ' ' + retorno.Persona.ApellidoPaterno + ' ' + retorno.Persona.ApellidoMaterno);
            sessionStorage.setItem('REG_ID', retorno.Region.Id);
            sessionStorage.setItem('REG_NOMBRE', retorno.Region.Nombre);
            sessionStorage.setItem('COM_ID', retorno.Comuna.Id);
            sessionStorage.setItem('COM_NOMBRE', retorno.Comuna.Nombre);*/

            this.codigoCliente = codigoCliente;
            this.loggedIn = true;
          }
          return this.loggedIn;
        }
      );

  }
  logout(): void  {
    sessionStorage.clear();

    this.codigoCliente = '';
    this.loggedIn = false;
  }
  isLoggedId(){
    return this.loggedIn;
  }

}
