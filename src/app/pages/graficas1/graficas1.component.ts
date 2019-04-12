import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-graficas1',
  templateUrl: './graficas1.component.html',
  styles: []
})
export class Graficas1Component implements OnInit {

graficos: any = {
  'grafico1': {
    'labels': ['Con queso', 'Con mermelada', 'Con chorizo'],
    'data':  [24, 30, 46],
    'type': 'doughnut',
    'leyenda': 'El pan se come con'
  },
  'grafico2': {
    'labels': ['Hombres', 'Mujeres', 'No opinan'],
    'data':  [4500, 6000, 2600],
    'type': 'bar',
    'leyenda': 'Entrevistados'
  },
  'grafico3': {
    'labels': ['Si', 'No', 'No saben'],
    'data':  [95, 5, 45],
    'type': 'polarArea',
    'leyenda': '¿Te gustan las bodas'
  },
  'grafico4': {
    'labels': ['Mujeres', 'Hombres', 'Indecisos'],
    'data':  [85, 15, 11],
    'type': 'line',
    'leyenda': '¿Quen vive Mejor?'
  },
};

constructor() { }

ngOnInit() {
}




}
