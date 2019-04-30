import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../users/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(
    public _usuariosService: UsuarioService
  ){}
  canActivate() {

    if (this._usuariosService.usuario.role === 'ADMIN_ROLE' ) {
      
      return true;
    }else{
      console.log('Bloqueado por el Admin Guards');
      this._usuariosService.logout();
      return false;
    }
  }
  
}
