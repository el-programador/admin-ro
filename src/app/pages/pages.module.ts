import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';

import { FormsModule } from '@angular/forms';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { ProfileComponent } from './profile/profile.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { PagesComponent } from './pages.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { MedicosComponent } from './medicos/medicos.component';
import { HospitalesComponent } from './hospitales/hospitales.component';
import { ModalUploadsComponent } from '../components/modal-uploads/modal-uploads.component';

// RUTAS
import {  PAGES_ROUTER } from './pages.routes';

//libreiras externas 
//graficas
import { ChartsModule } from 'ng2-charts';

//temporales
import { IncrementadorComponent } from '../components/incrementador/incrementador.component';
import { GraficosDonaComponent } from '../components/graficos-dona/graficos-dona.component';
import { AccountSettingComponent } from '../components/account-settings/account-setting.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';

// pipes
import { PiepesModule } from '../pipes/piepes.module';


@NgModule({
    declarations: [
        
    DashboardComponent,
    ProgressComponent,
    PagesComponent,
    Graficas1Component,
    IncrementadorComponent,
    GraficosDonaComponent,
    AccountSettingComponent,
    PromesasComponent,
    RxjsComponent,
    ProfileComponent,
    UsuariosComponent,
    MedicosComponent,
    HospitalesComponent,
    ModalUploadsComponent
    ],

    exports: [
        DashboardComponent,
        ProgressComponent,
        Graficas1Component, 
        PagesComponent, 
        SharedModule,
        ModalUploadsComponent
       
    ],
    imports:[
        CommonModule,
        SharedModule,
        PAGES_ROUTER,
        FormsModule,
        ChartsModule,
        PiepesModule
    ]
})


export class PagesModule {}