import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-graficos-dona',
  templateUrl: './graficos-dona.component.html',
  styles: []
})
export class GraficosDonaComponent implements OnInit {

// Doughnut
@Input('chartLabels') doughnutChartLabels: string[] = [];
@Input('chartData') doughnutChartData: number[]= [];
@Input('chartType')  doughnutChartType: string= '';

//2do grafico  
//public type: ChartType = 'polarArea';

constructor() { }

ngOnInit() {
}

// events
public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
  console.log(event, active);
}

public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
  console.log(event, active);
}

}
