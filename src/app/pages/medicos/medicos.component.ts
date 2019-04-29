import { Component, OnInit } from '@angular/core';
import { Medico } from 'src/app/models/medico.model';
import { FormGroup } from '@angular/forms';
import { MedicoService } from 'src/app/services/service.index';

import Swal from 'sweetalert2';


@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: []
})
export class MedicosComponent implements OnInit {

  medicos:Medico[] = [];
  totalRegistros:number = 0;
  desde:number = 0;
  cargando:boolean = true;
  forma: FormGroup;

  constructor(
    public _medicoService: MedicoService
  ) { }

  ngOnInit() {
    this.cargaMedicos();
  }




  cargaMedicos( ){
    this.cargando = true;
    this._medicoService.cargarMedicos( this.desde ).subscribe((res:any) => { 
      this.totalRegistros= res.total;
      this.medicos = res.medicos;
      this.cargando = false;
      // console.log(res);
    });
    
  }

  

  buscarMedico( texto:string ){

    if ( texto.length <= 0) {
      this.cargaMedicos();
      return;
    }
     this.cargando= true;

    this._medicoService.buscarMedico( texto )
                        .subscribe((medicos:Medico[])=>{
          
                          this.medicos = medicos;

                          this.cargando = false;
                        })
  }
  

  borrarMedico( medico: Medico ){
    
    if ( !medico ) {
      Swal.fire(
        'No se puede borrar medico', 
        'No ha sido posible borrar el medico ',
        'error'
        );
      return;
    }
    Swal.fire({
      title:'¿Esta seguro?', 
      text: 'Está a punto de borrar a ' + medico.nombre,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    })
      .then( borrar =>{ 
        if( borrar){
          this._medicoService.borrarMedico( medico._id )
                              .subscribe( borrado =>{
                                console.log(borrado);
                                this.cargaMedicos();
                              });
        }
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
    this.cargaMedicos();
    
    
  }
  

}
