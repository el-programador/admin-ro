import { Injectable } from '@angular/core';
import {  CanActivate, Router } from '@angular/router';
import { UsuarioService } from '../usuario/usuario.service';



@Injectable({
  providedIn: 'root'
})
export class LoginGuardsGuard implements CanActivate {

  constructor( 
    public _usuarioService: UsuarioService,
    public router: Router
    ){  }

  canActivate(){
   
    if ( this._usuarioService.estaLogeado() ) {
      console.log('PASO EL GUARDS');
      return true;
    }else{
      console.log('Bloqueado por el Guards');
      this.router.navigate(['/login']);
      return false;
    }
  }

  
}
