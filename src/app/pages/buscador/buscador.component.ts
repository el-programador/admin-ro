import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { URL_SERVICES } from 'src/app/config/config';
import { HttpClient } from '@angular/common/http';
import { Usuario } from 'src/app/models/usuario.model';
import { Medico } from 'src/app/models/medico.model';
import { Hospital } from '../../models/hospital.model';

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styles: []
})
export class BuscadorComponent implements OnInit {

  usuarios: Usuario[]=[];
  medicos: Medico[]=[];
  hospitales: Hospital[]=[];

  constructor(
    public activatedRoute: ActivatedRoute,
    public http: HttpClient
  ) {
    this.activatedRoute.params.subscribe( params=>{
      let texto = params['texto'];
      this.buscar( texto );
    })
   }

  ngOnInit() {
  }

  buscar( texto:string){
    let url = URL_SERVICES + '/busqueda/todo/' + texto;
    this.http.get( url ).subscribe( (res:any) =>{
      // console.log(res);
      this.usuarios = res.usuarios;
      this.medicos = res.medicos;
      this.hospitales = res.hospitales;
    })

  }
  

}
