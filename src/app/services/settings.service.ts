import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  ajustes:Ajustes = {
    themeUrl:'assets/css/colors/default-dark.css',
    theme: 'default-dark'
}
  

  constructor(@Inject(DOCUMENT) private _document ) { 
    this.cargarAjustesEnStorage();
  }


  cargarAjustesEnStorage(){
    if ( localStorage.getItem('settings' ) ) {   
      this.ajustes = JSON.parse( localStorage.getItem('settings' ) ) ;
      //nada mas cargar tiene que haber un tema por defecto
      this.changeTheme( this.ajustes.theme );
    }
  }


    changeTheme( theme:string ){
      let url = `assets/css/colors/${ theme }.css`
      this._document.getElementById('theme').setAttribute( 'href', url );
  
      this.ajustes.themeUrl = url;
      this.ajustes.theme = theme;
      this.guardarAjustesEnStorage();
    }



  guardarAjustesEnStorage(){
    localStorage.setItem('settings', JSON.stringify( this.ajustes) );
  }  

}

interface Ajustes{
  themeUrl:string;
  theme: string;
}