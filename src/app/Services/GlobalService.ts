import { Injectable, Component } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { AppSettings } from '../../../AppSettings'

import 'rxjs/add/operator/map';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
@Injectable()
export class GlobalService{
    nombreUsuario: string;
    envoltorio: any;
    loggedIn:boolean;

    persona: any;
  
    constructor(
      private http: Http
    ){
      //inicializamos los valores
      this.nombreUsuario = '';
      this.persona = null;
      this.loggedIn = false;
      this.envoltorio = null;
    }
  
    Post(usuario, clave){
      let url = AppSettings.URL_API + 'Login';
      //let url = 'http://api.asambleas.cl/api/login';
  
      let iJson = JSON.stringify({Usuario: usuario, Clave: clave});
  
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
              if (retorno.Id > 0) {
                sessionStorage.setItem('PERSONA', retorno);
                this.envoltorio = retorno;
                this.persona = retorno;
                this.nombreUsuario = usuario;
                sessionStorage.setItem('USUARIO', this.nombreUsuario);
                sessionStorage.setItem('ROL_ID', retorno.RolId);
                sessionStorage.setItem('PROF_ID', retorno.Id);
                this.loggedIn = true;
              }
              else {
                this.loggedIn = false;
              }
            }
            return this.loggedIn;
          }
        );
  
    }
    postProfesores(){
      var usuario = localStorage.getItem("USUARIO");
      let url = AppSettings.URL_API + 'Profesores';
      let dataGet = { Usuario: usuario };
  
      let repos = this.http.post(url, dataGet, {
        headers: new Headers({'Content-Type': 'application/json'})
      });
      return repos;
    }
    postClientes(){
      var usuario = localStorage.getItem("USUARIO");
      let url = AppSettings.URL_API + 'Clientes';
      let dataGet = { Usuario: usuario };
  
      let repos = this.http.post(url, dataGet, {
        headers: new Headers({'Content-Type': 'application/json'})
      });
      return repos;
    }
    postComunas(profesor){
      var usuario = localStorage.getItem("USUARIO");
      let url = AppSettings.URL_API + 'Comunas';
      let dataGet = { IdProfesor: profesor.Id.toString() };
  
      let repos = this.http.post(url, dataGet, {
        headers: new Headers({'Content-Type': 'application/json'})
      });
      return repos;
    }
    putProfesor(idProfesor, rut, nombres, primerApellido, segundoApellido, telefonos, sexo, correo, activo){
      var usuario = localStorage.getItem("USUARIO");
      let url = AppSettings.URL_API + 'Profesores';
      let dataGet = { 
        IdProfesor: idProfesor,
        Rut: rut,
        Nombres: nombres,
        PrimerApellido: primerApellido,
        SegundoApellido: segundoApellido,
        Telefonos: telefonos,
        Sexo: sexo,
        Correo: correo,
        Activo: activo 
      };
  
      let repos = this.http.put(url, dataGet, {
        headers: new Headers({'Content-Type': 'application/json'})
      });
      return repos;
    }
    putCliente(idCliente, nombres, primerApellido, segundoApellido, regId, comId, telefonos, correo, direccion, activo){
      var usuario = localStorage.getItem("USUARIO");
      let url = AppSettings.URL_API + 'Cliente';
      let dataGet = { 
        IdCliente: idCliente,
        Nombres: nombres,
        PrimerApellido: primerApellido,
        SegundoApellido: segundoApellido,
        Telefonos: telefonos,
        RegId: regId,
        ComId: comId,
        Direccion: direccion,
        Correo: correo,
        Activo: activo 
      };
  
      let repos = this.http.put(url, dataGet, {
        headers: new Headers({'Content-Type': 'application/json'})
      });
      return repos;
    }
    putProfesorComunas(idProfesor, idsComunas){
      var usuario = localStorage.getItem("USUARIO");
      let url = AppSettings.URL_API + 'Comunas';
      let dataGet = { 
        IdProfesor: idProfesor,
        Comunas: idsComunas 
      };
  
      let repos = this.http.put(url, dataGet, {
        headers: new Headers({'Content-Type': 'application/json'})
      });
      return repos;
    }
    postComunasRegion(idRegion){
      let url = AppSettings.URL_API + 'Territorio';
      let dataGet = { IdRegion: idRegion.toString() };
  
      let repos = this.http.post(url, dataGet, {
        headers: new Headers({'Content-Type': 'application/json'})
      });
      return repos;
    }    
    logout(): void {
        sessionStorage.clear();
        this.persona = null;
        this.nombreUsuario = '';
      this.loggedIn = false;
    }
    isLoggedId(){
      return this.loggedIn;
    }
    postProductos(){
      var usuario = localStorage.getItem("USUARIO");
      let url = AppSettings.URL_API + 'Productos';
      let dataGet = { Usuario: usuario };
  
      let repos = this.http.post(url, dataGet, {
        headers: new Headers({'Content-Type': 'application/json'})
      });
      return repos;
    }
    putProductoCodigo(idCliente, codigoCliente, proId, cantidadClases, descuento, totalPack, cantidadAlumnos){
      var usuario = localStorage.getItem("USUARIO");
      let url = AppSettings.URL_API + 'ProductoCodigo';
      let dataGet = { 
        IdCliente: idCliente.toString(),
        CodigoCliente: codigoCliente,
        ProId: proId.toString(),
        CantidadClases: cantidadClases.toString(),
        Descuento: descuento.toString(),
        TotalPack: totalPack.toString(),
        CantidadAlumnos: cantidadAlumnos.toString()
      };
  
      let repos = this.http.put(url, dataGet, {
        headers: new Headers({'Content-Type': 'application/json'})
      });
      return repos;
    }
    postActualizarAgenda(mesInicio, profId, anno){
      var usuario = localStorage.getItem("USUARIO");
      let url = AppSettings.URL_API + 'ActualizarAgenda';
      let dataGet = { 
        NodId: '1',
        MesInicio: mesInicio.toString(),
        ProfId: profId.toString(),
        Anno: anno.toString() 
      };
  
      let repos = this.http.post(url, dataGet, {
        headers: new Headers({'Content-Type': 'application/json'})
      });
      return repos;
    }
    postBuscarSegmentos(fechaEntera, profId, esBloqueado){
      var usuario = localStorage.getItem("USUARIO");
      let url = AppSettings.URL_API + 'BuscarSegmentos';
      let dataGet = { 
        NodId: '1',
        FechaEntera: fechaEntera.toString(),
        ProfId: profId.toString(),
        EsBloqueado: esBloqueado.toString() 
      };
  
      let repos = this.http.post(url, dataGet, {
        headers: new Headers({'Content-Type': 'application/json'})
      });
      return repos;
    }
    putSegmentos(nodId, fechaEntera, profId, arregloShg, arregloNo){

      let url = AppSettings.URL_API + 'BuscarSegmentos';
      let dataGet = { 
        NodId: nodId.toString(),
        FechaEntera: fechaEntera.toString(),
        ProfId: profId.toString(),
        Segmentos: arregloShg,
        SegmentosNo: arregloNo
      };
  
      let repos = this.http.put(url, dataGet, {
        headers: new Headers({'Content-Type': 'application/json'})
      });
      return repos;
    }
    postObtenerPCOGrilla(estado, codigo){
      var usuario = localStorage.getItem("USUARIO");
      let url = AppSettings.URL_API + 'ObtenerProductoCodigoGrilla';
      let dataGet = { 
        Estado: estado.toString(),
        Codigo: codigo
      };
  
      let repos = this.http.post(url, dataGet, {
        headers: new Headers({'Content-Type': 'application/json'})
      });
      return repos;
    }
    postClientePackProducto(pcoId){
      var usuario = localStorage.getItem("USUARIO");
      let url = AppSettings.URL_API + 'ClientePaackProducto';
      let dataGet = { 
        PcoId: pcoId.toString()
      };
  
      let repos = this.http.post(url, dataGet, {
        headers: new Headers({'Content-Type': 'application/json'})
      });
      return repos;
    }
}