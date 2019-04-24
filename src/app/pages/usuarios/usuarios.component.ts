import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService, ModalUploadService } from 'src/app/services/service.index';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {

  usuarios:Usuario[] = [];
  desde:number = 0;
  totalRegistros: number = 0;
  cargando:boolean = true;

  constructor(
    public _usuarioService: UsuarioService,
    public _modalUploadServive: ModalUploadService
  ) { }

  ngOnInit() {
    this.cargaUsuarios();
  // quiero que automaticamente refresque la pagina cuando hago un cambio puedo hace cualquier cosa
    this._modalUploadServive.notificacion.subscribe( res => this.cargaUsuarios() );
  }

mostrarModal( id: string ){
  this._modalUploadServive.mostrarModal('usuarios', id);
}
  

  cargaUsuarios(){

    this.cargando = true;
    this._usuarioService.cargarUsuarios( this.desde )
                        .subscribe((res:any) =>{
                          // console.log( res);
                          this.totalRegistros = res.total;
                          this.usuarios = res.usuarios;
                          
                          this.cargando= false;
                        })
  }
  

  cambiarDesde( valor ){
  
    let desde = this.desde + valor;

    if (desde >= this.totalRegistros ) {
      return;
    }
    if (desde <0 ) {
      return;
    }
// regrsame de 5 en 5
    this.desde += valor;
    this.cargaUsuarios();
    
    
  }

  buscarUsuario( texto:string ){

    if ( texto.length <= 0) {
      this.cargaUsuarios();
      return;
    }

    this.cargando= true;
    this._usuarioService.busquedaUsuarios( texto )
                        .subscribe((usuarios:Usuario[])=>{
          
                          this.usuarios = usuarios;

                          this.cargando = false;
                        })
  }

  borrarUsuario( usuario:Usuario ){
    
    if ( usuario._id === this._usuarioService.usuario._id) {
      Swal.fire(
        'No se puede borrar usuario', 
        'No se puede borrar a sí mismo ',
        'error'
        );
      return;
    }
    Swal.fire({
      title:'¿Esta seguro?', 
      text: 'Está a punto de borrar a ' + usuario.nombre,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    })
      .then( borrar =>{
        if( borrar){
          this._usuarioService.borrarUsuario( usuario._id )
                              .subscribe( borrado =>{
                                console.log(borrado);
                                this.cargaUsuarios();
                              });
        }
      })

  }

  guardarUsuario( usuario:Usuario){

    this._usuarioService.actualizarUsuario( usuario).subscribe();
  }
  
}
