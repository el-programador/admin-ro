import { Injectable } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';

import { HttpClient } from '@angular/common/http';
import { URL_SERVICES } from 'src/app/config/config';

import { map } from 'rxjs/operators';


import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { UpFilesService } from '../upFiles/up-files.service';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario:Usuario;
  token: string;

  constructor(
     public http: HttpClient,
     public router: Router,
     public _upfileService: UpFilesService
  ) {
    this.cargarStorage();
   }

   estaLogeado(){
   return ( this.token.length > 5 ) ? true : false;
   }
// cargar storage
cargarStorage(){
  if ( localStorage.getItem('token') ) {
    this.token = localStorage.getItem('token');
    this.usuario = JSON.parse( localStorage.getItem('usuario'));
  }else{
    this.token = '';
    this.usuario = null;
  }
}
// guardamos en localstorage
guardarStorage( id: string, token: string, usuario: Usuario ){
    localStorage.setItem( 'id', id );
    localStorage.setItem( 'token', token );
    localStorage.setItem( 'usuario', JSON.stringify( usuario));  
  // seteamos valores
  this.usuario = usuario;
  this.token = token;
}


   logout(){
    this.token = '';
    this.usuario = null;

    localStorage.removeItem( 'token' );
    localStorage.removeItem( 'usuario' );

    this.router.navigate(['/login']);
   }



   loginGoogle( token: string ){

    let url = URL_SERVICES + '/login/google';

    return this.http.post( url, { token })
                    .pipe(map( (res:any)=>{

                      this.guardarStorage( res.id, res.token, res.usuario );

                      Swal.fire(
                        'Autenticado correctamente', 
                        'con Google',
                        'success'
                        );
                      return true;
                      
                    }));

   }



   login( usuario: Usuario, remember:boolean= false ){
     if ( remember ) {
       localStorage.setItem( 'email', usuario.email );
     }else{
       localStorage.removeItem('email'); //si no lo ha marcado que lo elimine
     }
    
    let url = URL_SERVICES + '/login';

    return this.http.post( url, usuario )
                    .pipe(map( (res:any)=>{
//grbamos en localestorage
                      this.guardarStorage( res.id, res.token, res.usuario );
                
                      Swal.fire(
                        'Logeado correctamente', 
                        usuario.email,
                        'success'
                      );
                      return true;
                      
                    }));
                
   }

//llego la hora de vincular con el BACKEND (igual como POSTMAN)
//este Usuario es el esquema del modelo por lo tanto ya tine usuario esos paramentros que mandamos por post
//almaceno el post localhost:usuario de postman en archivo aparte de cofig para que el dia de mañana sea mas facil de cambiar la url
//  1.-
crearUsuario( usuario: Usuario ){

  let url = URL_SERVICES + '/usuario';

  return this.http.post( url, usuario )
                  .pipe(map( (res:any)=>{

                    Swal.fire(
                      'Usuario creado', 
                      usuario.email,
                      'success'
                      );
                    return res.usuario;
                    
                  }));

 }

 actualizarUsuario( usuario: Usuario ){

  let url = URL_SERVICES + '/usuario/' + usuario._id ;
  url += '?token=' + this.token;

  return this.http.put( url, usuario )
                  .pipe(map( (res:any)=>{
                    
                  let usuarioDB: Usuario = res.usuario;
                  this.guardarStorage( usuarioDB._id, this.token, usuarioDB )

                    Swal.fire(
                      'Usuario Actualizado', 
                      usuario.nombre,
                      'success'
                    );
                    
                    return true;
                  }));

 }


 cmabiarImagen( archivo: File, id: string ){

  this._upfileService.subirArchivo( archivo, 'usuarios', id )
          .then((res:any)=>{
           this.usuario.img = res.usuario.img;
            Swal.fire(
              'Imagen de Usuario Actualizada', 
              this.usuario.nombre,
             'success'
            );
          
            this.guardarStorage( id, this.token, this.usuario );
            //console.log( res );
          })
          .catch( err =>{
            console.log(err);
          });
 }



}
