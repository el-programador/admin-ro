import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: []
})
export class IncrementadorComponent implements OnInit {

  @ViewChild('txtProgress') txtProgress: ElementRef;

  @Input('nombre') leyenda:string= 'Leyenda'
  @Input() progreso:number = 50;

  @Output() cambiaValorDelProgreso: EventEmitter<number> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }


  cambiar( newValue:number ){
    //let elemHtml:any = document.getElementsByName('progreso')[0];

    if (newValue >= 100 ) {
      this.progreso = 100;
    }else if (newValue <= 0 ) {
      this.progreso = 0;
    }else{
      this.progreso = newValue;
    }

    //elemHtml.value = this.progreso;

    this.txtProgress.nativeElement.value = this.progreso;//con esto ponga lo que ponga la gente siempre va a ser un valor entre 0 y 100

    this.cambiaValorDelProgreso.emit(this.progreso);

    

  }



  cambiarValor( valor:number ){
    if (this.progreso >= 100 && valor > 0) {
      this.progreso = 100;
      return;
    }
    if (this.progreso <= 0 && valor < 0) {
      this.progreso = 0;
      return;
    }

    this.progreso = this.progreso + valor;

    this.cambiaValorDelProgreso.emit(this.progreso);

    this.txtProgress.nativeElement.focus();
  }

  

}
