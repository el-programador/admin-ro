import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICES } from '../config/config';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform( img: string, tipo: string = 'usuario'): any {

  let url = URL_SERVICES + '/img';
  // sino viene imagen
  if ( !img ) {
    return url + '/usuarios/xxx';
  }
  // para las imagenes de google no hacmoes nada lo retornamos como viene
  if ( img.indexOf('https') >= 0 )  {
    return img;
  }

   switch ( tipo ) {
     case 'usuario':
       url += '/usuarios/' + img;
       break;
       case 'medico':
       url += '/medicos/' + img;
       
       break;
       case 'hospital':
       url += '/hospitales/' + img;
       
       break;
   
     default:
     console.log('Tipo de imagen no existe: usuario, medico, hospital');
      url += '/usuarios/xxx';  
    }
    return url;
  }

}
