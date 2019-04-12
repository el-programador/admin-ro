import { Component, OnInit,  ElementRef } from '@angular/core';
import { SettingsService  } from 'src/app/services/service.index';

@Component({
  selector: 'app-account-setting',
  templateUrl: './account-setting.component.html',
  styles: []
})
export class AccountSettingComponent implements OnInit {

  constructor( public _settings:SettingsService ) { }

  ngOnInit() {
    this.colocarCheck();
  }
  
  cambiarColor( theme:string, link:ElementRef ){
    this.aplicarCheck( link );
    //aplico la funcion del servicio que cambia el tema
    this._settings.changeTheme( theme ); 
  }

  aplicarCheck( link:any ){
    let selectores:any = document.getElementsByClassName(' selector');

        for( let ref of selectores ){
          ref.classList.remove('working');
        }
        
    link.classList.add('working');
  }

  colocarCheck(){
    let selectores:any = document.getElementsByClassName(' selector');
    let theme = this._settings.ajustes.theme;
              
        for( let ref of selectores ){
          if (ref.getAttribute( 'data-theme') === theme ) {
            ref.classList.add('working');
            break;
          } 
        }
        
  }

}
