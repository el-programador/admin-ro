import { Injectable } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';

import { HttpClient } from '@angular/common/http';
import { URL_SERVICES } from 'src/app/config/config';

import { map, catchError } from 'rxjs/operators';


import Swal from 'sweetalert2';

import { Router } from '@angular/router';
import { UpFilesService } from '../upFiles/up-files.service';
import { throwError } from 'rxjs/internal/observable/throwError';



@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario:Usuario;
  token: string; 
  menu:any[] = [];

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
    this.menu = JSON.parse( localStorage.getItem('menu'));
  }else{
    this.token = '';
    this.usuario = null;
    this.menu = [];
  }
}
// guardamos en localstorage
guardarStorage( id: string, token: string, usuario: Usuario, menu:any ){
    localStorage.setItem( 'id', id );
    localStorage.setItem( 'token', token );
    localStorage.setItem( 'usuario', JSON.stringify( usuario));  
    localStorage.setItem( 'menu', JSON.stringify( menu) );  
  // seteamos valores
  this.usuario = usuario;
  this.token = token;
  this.menu = menu;
}


   logout(){
    this.token = '';
    this.usuario = null;
    this.menu = [];

    localStorage.removeItem( 'token' );
    localStorage.removeItem( 'usuario' );
    localStorage.removeItem( 'menu' );

    this.router.navigate(['/login']);
   }



   loginGoogle( token: string ){

    let url = URL_SERVICES + '/login/google';

    return this.http.post( url, { token })
                    .pipe(map( (res:any)=>{

                      this.guardarStorage( res.id, res.token, res.usuario, res.menu );
                        
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
                      this.guardarStorage( res.id, res.token, res.usuario, res.menu );
                
                      Swal.fire(
                        'Logeado correctamente', 
                        usuario.email,
                        'success'
                      );
                      return true;
                      
                    }),
                    catchError( err=>{
                      //console.log( err.error.mensaje );
                      Swal.fire(
                        'Error al hacer Login', 
                        err.error.mensaje,
                        'error'
                      );
                      return throwError(err);
                    })
                    );
                
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
                    
                  }),
                  catchError( err=>{                 
                    Swal.fire(
                      err.error.mensaje, 
                      err.error.errors.message,
                      'error'
                    );
                    return throwError(err);
                  })
                  );

 }

 actualizarUsuario( usuario: Usuario ){

  let url = URL_SERVICES + '/usuario/' + usuario._id ;
  url += '?token=' + this.token;

  return this.http.put( url, usuario )
                  .pipe(map( (res:any)=>{

                    if (usuario._id === this.usuario._id) {
                      let usuarioDB: Usuario = res.usuario;
                      this.guardarStorage( usuarioDB._id, this.token, usuarioDB, this.menu )                 
                    }
                    
                    Swal.fire(
                      'Usuario Actualizado', 
                      usuario.nombre,
                      'success'
                    );                    
                    return true;
                  }),
                  catchError( err=>{                 
                    Swal.fire(
                      err.error.mensaje, 
                      err.error.errors.message,
                      'error'
                    );
                    return throwError(err);
                  })
                  );

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
          
            this.guardarStorage( id, this.token, this.usuario, this.menu );
            //console.log( res );
          })
          .catch( err =>{
                          
                    Swal.fire(
                     'Error',
                      'Error al sustituir imagen',
                      'error'
                    );
                   
                  
          });
 }


 cargarUsuarios( desde:number= 0 ){
   let url = URL_SERVICES + '/usuario?desde=' + desde;
    return this.http.get( url );
 }

 busquedaUsuarios( texto:string ){
  let url = URL_SERVICES + '/busqueda/coleccion/usuarios/' + texto;
  return this.http.get( url )
  .pipe( map( (res:any) => res.usuarios ));
 }


 borrarUsuario( id: string){
   let url = URL_SERVICES + '/usuario/' + id;
   url += '?token=' + this.token;
   return this.http.delete( url )
               .pipe(map( res =>{
                Swal.fire(
                  'Usuario Borrado', 
                  'El usuario ha sido borrado correctamente',
                  'success'
                );    
                return true;
               }),
               catchError( err=>{                 
                 Swal.fire(
                   err.error.mensaje, 
                   err.error.errors.message,
                   'error'
                 );
                 return throwError(err);
               })
               );
 }

}
