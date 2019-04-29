import { Injectable } from '@angular/core';
import { Hospital } from 'src/app/models/hospital.model';
import { URL_SERVICES } from 'src/app/config/config';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { map } from 'rxjs/operators';

import Swal from 'sweetalert2';

import { UsuarioService } from '../users/usuario.service';
import { UpFilesService } from '../upFiles/up-files.service';


@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  hospital: Hospital;
  

  constructor(
    public http: HttpClient,
     public router: Router,
     public _upfileService: UpFilesService,
     public _usuarioService: UsuarioService
  ) { }


  // No hace falta que reciba parámetros, pero retorna un observablecon todos los hospitales.
  cargarHospitales( desde:number= 0 ){
    let url = URL_SERVICES + '/hospital?desde=' + desde;
    return this.http.get( url );
  }



  // Esta función recibe un ID de un hospital y retorna toda la información del mismo
  obtenerHospital( id: string ){
    let url= URL_SERVICES + '/hospital/' + id;
    return this.http.get(url)
                .pipe(map( (res:any )=> res.hospital));
  }



// Recibe un ID de un hospital y lo borra
  borrarHospital( id: string ){
    let url = URL_SERVICES + '/hospital/' + id;
    url += '?token=' + this._usuarioService.token;
    return this.http.delete( url )
                .pipe(map( res =>{
                 Swal.fire(
                   'Hospital Borrado', 
                   'El hospital ha sido borrado correctamente',
                   'success'
                 );    
                 return true;
                }));
  }


creaHospital( hospital: Hospital){
  let url = URL_SERVICES + '/hospital';
  url += '?token=' + this._usuarioService.token;

  return this.http.post( url, hospital ).pipe(map( (res:any)=>{
    Swal.fire(
      'Hospital Creado', 
      hospital.nombre,
      'success'
    );    
    return res.hospital;
  }));

}
  


  // Recibe el hospital y lo actualiza
  actualizarHospital( hospital: Hospital ){
    let url = URL_SERVICES + '/hospital/' + hospital._id ;
    url += '?token=' + this._usuarioService.token;

  return this.http.put( url, hospital )
                  .pipe(map( (res:any)=>{                    
                    Swal.fire(
                      'hospital Actualizado', 
                      hospital.nombre,
                      'success'
                    );                    
                    return true;
                  }));
  }


 // Recibe el término de búsqueda y retorna todos los hospitales que coincidan con ese término de búsqueda

  buscarHospitales( texto:string ){
    let url = URL_SERVICES + '/busqueda/coleccion/hospitales/' + texto;
    return this.http.get( url )
    .pipe( map( (res:any) => res.hospitales ));
   }
  
  
  
}
