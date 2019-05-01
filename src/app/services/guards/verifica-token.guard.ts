import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsuarioService } from '../users/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class VerificaTokenGuard implements CanActivate {

  constructor(
    public _usuarioService: UsuarioService,
    public router: Router
  ){}


  canActivate(): Promise<boolean> | boolean {
    console.log('Token Guard');

    // como saber el que momento renovar el token
    let token = this._usuarioService.token;
    let payload = JSON.parse( atob( token.split('.')[1] ));

    let expirado = this.expirado( payload.exp );

    if (expirado) {
      this.router.navigate(['/login']);
      return false;
    }
  
    // console.log(payload);

    return this.verificaRenueva( payload.exp );
  }



  verificaRenueva( fechaExp:number ):Promise<boolean>{
    return new Promise( (resolve, reject)=>{

      let tokenExp = new Date( fechaExp * 1000 );
      let ahora = new Date();

      ahora.setTime( ahora.getTime() * (1 * 60 * 60 * 1000 ) ); //Lo renueva cuando falte una hora
      
      if ( tokenExp.getTime() > ahora.getTime() ) {
        resolve( true );
      }else{
        this._usuarioService.renuevaToken()
                            .subscribe( ()=> {
                              resolve( true );
                            }, ()=>{
                              this.router.navigate(['/login']);
                              reject( false );
                            });
      }
    });
  
  }
  
  
  
  
  
  //Si el token ya expiró
  expirado( fechaExp: number ){

    let ahora = new Date().getTime() /1000; //getTime esta en milisegundos y la fecha queme tre la funcion ATOB esta en exp=en segungndos
  
    if (fechaExp < ahora ) {
      return true;
    }else{
      return false;
    } 
  
  }
  
  
  
}
