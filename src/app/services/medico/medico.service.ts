import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICES } from 'src/app/config/config';
import { map } from 'rxjs/operators';

import Swal from 'sweetalert2';
import { UsuarioService } from '../users/usuario.service';
import { Medico } from 'src/app/models/medico.model';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {



  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService
  ) { }


  cargarMedicos(  desde:number= 0 ){
    let url = URL_SERVICES + '/medico?desde=' + desde;
    return this.http.get( url);
    
    // .pipe(map( (res:any)=>{
    //   console.log(res.medicos);
     
    //   return res.medicos;
    // }))
  }

  
  cargarUnMedico( id:string ){
    let url = URL_SERVICES + '/medico/' + id;
    return this.http.get( url)
    .pipe(map( (res:any)=> res.medico ));
  }




  buscarMedico( texto:string ){
    let url = URL_SERVICES + '/busqueda/coleccion/medicos/' + texto;
    return this.http.get( url )
    .pipe( map( (res:any) => res.medicos ));
   }
  

   borrarMedico( id: string){
    let url = URL_SERVICES + '/medico/' + id;
    url += '?token=' + this._usuarioService.token;
    return this.http.delete( url )
                .pipe(map( res =>{
                 Swal.fire(
                   'Medico Borrado', 
                   'El medico ha sido borrado correctamente',
                   'success'
                 );    
                 return true;
                }));
  }
  
  
  guardarMedico( medico: Medico ){
    let url = URL_SERVICES + '/medico';
  
    if ( medico._id ) {
      // actualizando
      url += '/' + medico._id;
      url += '?token=' + this._usuarioService.token;
      
        return this.http.put( url, medico )
                .pipe(map( (res:any)=>{
                  Swal.fire(
                    'Medico Actualizado', 
                    medico.nombre,
                    'success'
                  );
                  return res.medico;    
                }));
    }else{
      // creando
      url += '?token=' + this._usuarioService.token;
      return this.http.post(url, medico ).pipe(map( (res:any)=>{
        Swal.fire(
          'Medico Creado', 
          medico.nombre,
          'success'
        );    
        return res.medico;
      }));
    }

  }

 
  

}
