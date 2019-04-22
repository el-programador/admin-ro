import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuario.model';

import Swal from 'sweetalert2';
import { Router } from '@angular/router';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login.component.css']
})
export class RegisterComponent implements OnInit {

  forma: FormGroup;

  constructor(
    public _usuarioService:UsuarioService,
    private router: Router
  ) { }

  //esta funcion vale para vailar cualquier campo modicando lo que queramos .. ahora usamos pa password
  sonIguales( campo1: string, campo2: string ){

    return ( group: FormGroup)=>{
      let pass1 = group.controls[campo1].value;
      let pass2 = group.controls[campo2].value;

      if (pass1 === pass2) {
        return null;
      }
      return {
        sonIguales : true
      };

    };
  }
  

  ngOnInit() {
//creando los campos que va a tener el aampo de formulario para el registro
    this.forma = new FormGroup({

      nombre : new FormControl( null, Validators.required ),
      email : new FormControl( null, [ Validators.required, Validators.email ] ),
      password : new FormControl( null,  Validators.required ),
      password2 : new FormControl( null,  Validators.required ),
      condiciones : new FormControl( false ),

    }, { validators: this.sonIguales( 'password', 'password2' )});

    this.forma.setValue({
      nombre: 'test ',
      email: 'test@test.com',
      password: '123456',
      password2: '123456',
      condiciones:true
      
    });
  }

  registrarUsuario(){

    if (this.forma.invalid) {
      return ;
    }

    if ( !this.forma.value.condiciones ) { 
      // sweet Alert para las alertas
      Swal.fire(
        'Iportant!', 
        'Acept the conditions, please', 
        'warning'
      );    
      return;
    }

    //creo nuevo usuario usando el modelo, Hay que declarar los 3 parametros que hemos puesto como obligatotios
    let usuario = new Usuario(
        this.forma.value.nombre,
        this.forma.value.email,
        this.forma.value.password
    );

    this._usuarioService.crearUsuario( usuario ).subscribe( res =>{
      
      console.log( res );
// despues de registrarme que me dirija a Login
      this.router.navigate(['/login']);

    })

    console.log('Formu = ' + this.forma.valid );
  }

}
