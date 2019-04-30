import { Component, OnInit } from '@angular/core';
import { Hospital } from 'src/app/models/hospital.model';
import { HospitalService } from 'src/app/services/service.index';
import { FormGroup, NgForm } from '@angular/forms';
import { ModalUploadService } from '../../services/upFiles/modal-upload.service';

import Swal from 'sweetalert2';


@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: []
})
export class HospitalesComponent implements OnInit {

  hospitales:Hospital[] = [];
  desde:number = 0;
  totalRegistros: number = 0;
  cargando:boolean = true;
  forma: FormGroup;

  hospital: Hospital = new Hospital('');

  constructor(
    public _hospitalService: HospitalService,
    public _modalService: ModalUploadService
  ) { }

  
  ngOnInit() {
    this.cargaHospitales();

    this._modalService.notificacion.subscribe( ()=> this.cargaHospitales() );

  }



  modalActualizarImg( hospital:Hospital ){
    this._modalService.mostrarModal( 'hospitales', hospital._id);
  }

  buscarHospital( texto:string ){
    if (texto.length <= 0) {
      this.cargaHospitales();
      return;
    }
    this._hospitalService.buscarHospitales( texto )
                          .subscribe((hospitales:Hospital[])=>{
                                
                            this.hospitales = hospitales;
                      
                            this.cargando = false;
                          })
      
  }

  cargaHospitales(){

    this.cargando= true;
    this._hospitalService.cargarHospitales( this.desde )
                        .subscribe((res:any) =>{
                          // console.log( res);
                          this.totalRegistros = res.total;
                          this.hospitales = res.hospitales;
                          
                           this.cargando= false;
                        });
  }
  

  crearHospital( f: NgForm ){
    if ( f.invalid ) {
      return;
    }
    
    this._hospitalService.creaHospital( this.hospital ).subscribe(hospital=>{
      this.hospital.nombre = hospital.nombre; //lo inicializo
      
    });
  }

  

  guardarHospital( hospital: Hospital ){
    this._hospitalService.actualizarHospital( hospital )
                          .subscribe();
  }


  borrarHospital( hospital: Hospital ){
    if ( !hospital._id ) {
      Swal.fire(
        'No se puede borrar Hospital', 
        hospital.nombre,
        'error'
        );
      return;
    }
    Swal.fire({
      title:'¿Esta seguro?', 
      text: 'Está a punto de borrar a ' + hospital.nombre,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    })
   
      .then( borrar =>{
       
        if( borrar && 'confirmButtonColor' ){

          this._hospitalService.borrarHospital( hospital._id )
                              .subscribe( borrado =>{
                                console.log(borrado);
                                this.cargaHospitales();
                              });
        }
        if(borrar === 'cancelButtonColor'){
         return this.cargaHospitales(); 
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
    this.cargaHospitales();
    
    
  }

}
