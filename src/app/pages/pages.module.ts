import { NgModule } from "@angular/core";

import { SharedModule } from '../shared/shared.module';

import { FormsModule } from '@angular/forms';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { PagesComponent } from './pages.component';

// RUTAS
import {  PAGES_ROUTER } from './pages.routes';

//libreiras externas 
//graficas
import { ChartsModule } from 'ng2-charts';

//temporales
import { IncrementadorComponent } from '../components/incrementador/incrementador.component';
import { GraficosDonaComponent } from '../components/graficos-dona/graficos-dona.component';



@NgModule({
    declarations: [
        
    DashboardComponent,
    ProgressComponent,
    PagesComponent,
    Graficas1Component,
    IncrementadorComponent,
    GraficosDonaComponent

    ],

    exports: [
        DashboardComponent,
        ProgressComponent,
        Graficas1Component, 
        PagesComponent, 
        SharedModule
       
    ],
    imports:[
        SharedModule,
        PAGES_ROUTER,
        FormsModule,
        ChartsModule
    ]
})

export class PagesModule {}