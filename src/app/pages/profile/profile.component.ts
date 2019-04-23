import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/service.index';

import Swal from 'sweetalert2';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {

  usuario: Usuario;
  imagenSubir:File;
  imgTemp: any;

  constructor(
    public _usuarioService : UsuarioService
  ) { 
    this.usuario = this._usuarioService.usuario;
  }
  
  ngOnInit() {
  }

  
  guardar( usuario: Usuario ){
    this.usuario.nombre = usuario.nombre;
    // los correos de google no estan permitidos actualizar
    if (!this.usuario.google) {  
      this.usuario.email = usuario.email;
    }

    this._usuarioService.actualizarUsuario( this.usuario )
    .subscribe();
  }
  
  seleccionImagen( archivo: File ){
    if ( !archivo ) {
      this.imagenSubir = null; //sino seleciona nada
      return;
    }  
  //si no  es una img
    if ( archivo.type.indexOf('image') < 0 ) {
      Swal.fire(
        'Only image please', 
        'this file is not image',
       'error'
      );
      this.imagenSubir = null;
      return;  
    }
    this.imagenSubir = archivo;
    // en ...archivo.. viene ya la imagen selecionada 
    // console.log(archivo);

  //obtengo imagen temporal
    let reader = new FileReader();
    let urlImgTemp = reader.readAsDataURL( archivo );

    reader.onloadend = () => this.imgTemp = reader.result;

  }
  
//mustra la imagen el usario puede subirlo o no despues de pre view
  cambiarImagen(){
  
    this._usuarioService.cmabiarImagen( this.imagenSubir, this.usuario._id );
  }
}
