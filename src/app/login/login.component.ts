import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/usuario/usuario.service';
import { Usuario } from '../models/usuario.model';


// libreria para google
declare const gapi:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email:string;
  remember:boolean = false;

  auth2:any;

  constructor( 
    public router:Router,
    public _usuarioService: UsuarioService
     ) { }

  ngOnInit() {

    this.email = localStorage.getItem( 'email') || '';
    if (this.email.length > 1) {
      this.remember = true;
      
      this.googleInit();
    }
  }


  // para inicializacion de google
  googleInit(){
    gapi.load('auth2', ()=>{
      this.auth2= gapi.auth2.init({
        client_id: '843099537749-et8oq554c7bg2ct81dvp8eue13eqa26k.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });
      this.attachSignin( document.getElementById('btn-google'));
    });
  }
  attachSignin( element ){
    this.auth2.attachClickHandler(element, {}, googleUser =>{
      // let profile = googleUser.getBasicProfile();
      let token = googleUser.getAuthResponse().id_token;

      this._usuarioService.loginGoogle( token )
                         .subscribe( loginCorrecto=> window.location.href = '#/dashboard'  );
                        //  this.router.navigate( ['/dashboard'] )
    });
  }
  
  

  ingresar( forma: NgForm ){
    if (forma.invalid) {
      return;
    }

    let usuario = new Usuario(
      null,
      forma.value.email,
      forma.value.password
    );

    this._usuarioService.login( usuario, forma.value.remember )
                        .subscribe( loginCorrecto=> this.router.navigate( ['/dashboard'] )  );
    
  }

}
