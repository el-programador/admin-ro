import { Component, OnInit } from '@angular/core';

import Swal from 'sweetalert2';
import { UpFilesService, ModalUploadService } from 'src/app/services/service.index';


@Component({
  selector: 'app-modal-uploads',
  templateUrl: './modal-uploads.component.html',
  styles: []
})
export class ModalUploadsComponent implements OnInit {


  imagenSubir:File;
  imgTemp: any;

  constructor(
    public _upfileService: UpFilesService,
    public _modalUploadsService: ModalUploadService

  ) { }

  ngOnInit() {
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


  subirImagen(){
   this._upfileService.subirArchivo( this.imagenSubir, this._modalUploadsService.tipo,  this._modalUploadsService.id )
                      .then( res =>{
                        console.log(res);

                        this._modalUploadsService.notificacion.emit( res );
                        this.cerrarModal();

                      })
                      .catch(err =>{
                        console.log('Error en la carga');
                      }); 
    
  }
  cerrarModal(){
    this.imgTemp = null;
    this.imagenSubir = null;

    this._modalUploadsService.ocultarModal();
  }

}
