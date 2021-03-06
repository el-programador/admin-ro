import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MedicoService, HospitalService, UsuarioService } from 'src/app/services/service.index';
import { Medico } from 'src/app/models/medico.model';
import { Hospital } from 'src/app/models/hospital.model';
import { Subscriber } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalUploadService } from '../../services/upFiles/modal-upload.service';


@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: []
})
export class MedicoComponent implements OnInit {

  hospitales: Hospital[] = [];
  medico: Medico = new Medico('','','','','');
  hospital: Hospital = new Hospital('');
  constructor(
    public _medicoService: MedicoService,
    public _hospitalService: HospitalService,
    public _usuarioService: UsuarioService,
    public router:Router,
    public activatedRoute: ActivatedRoute,
    public _modalUploadService: ModalUploadService
  ) { 
    activatedRoute.params.subscribe( params =>{
      let id = params['id'];
      if ( id !== 'nuevo' ) {
        this.cargarUnMedico( id );
      } 
    })
  }
  

  ngOnInit() {

    this._hospitalService.cargarHospitales()
                          .subscribe( (res:any) =>{
                           this.hospitales = res.hospitales;
                           
                          });
    
    this._modalUploadService.notificacion
                            .subscribe( res =>{
                              this.medico.img = res.medico.img;
                            });
                            
  }


  cargarUnMedico( id: string ){
    this._medicoService.cargarUnMedico( id )
      .subscribe( medico=> {
        
        this.medico = medico;
        this.medico.hospital = medico.hospital._id;
        this.cambioHospital( this.medico.hospital );

      });
       

  }
    

  guardarMedico( f: NgForm ){
    if ( f.invalid ) {
      return;
    }
    this._medicoService.guardarMedico( this.medico).subscribe(medico=>{
      this.medico._id = medico._id; //lo inicializo
      this.router.navigate(['/medico', medico._id]);
    });
  }



  cambioHospital( id: string ){
   this._hospitalService.obtenerHospital( id ).subscribe(hospital =>this.hospital = hospital);
  }


  cargarFoto(){
    this._modalUploadService.mostrarModal( 'medicos', this.medico._id );
  }

}
