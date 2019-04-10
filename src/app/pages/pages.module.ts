import { NgModule } from "@angular/core";

import { SharedModule } from '../shared/shared.module';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { PagesComponent } from './pages.component';

// RUTAS
import {  PAGES_ROUTER } from './pages.routes';


@NgModule({
    declarations: [
        
    DashboardComponent,
    ProgressComponent,
    PagesComponent,
    Graficas1Component

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
        PAGES_ROUTER
    ]
})

export class PagesModule {}