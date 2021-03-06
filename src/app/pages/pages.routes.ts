import {  RouterModule, Routes } from "@angular/router";

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { AccountSettingComponent } from '../components/account-settings/account-setting.component';
import { PromesasComponent } from './promesas/promesas.component';
import {  RxjsComponent } from './rxjs/rxjs.component';
import { ProfileComponent } from './profile/profile.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { MedicosComponent } from './medicos/medicos.component';
import { MedicoComponent } from './medicos/medico.component';
import { HospitalesComponent } from './hospitales/hospitales.component';
import { BuscadorComponent } from './buscador/buscador.component';

// guards
import { LoginGuardsGuard, VerificaTokenGuard } from '../services/service.index';
import { AdminGuard } from '../services/guards/admin.guard';




const pagesRoutes: Routes = [

          { 
            path: 'dashboard', 
            component: DashboardComponent,
            canActivate: [ VerificaTokenGuard ],
            data: { titulo: 'Dashboard', autor: 'Robert Mejia', description:'esta es la pagina de dashboar, es la primera pagina' } 
          },
          { path: 'progress', component: ProgressComponent, data: { titulo: 'Progress', autor: 'Robert Mejia' }},
          { path: 'graficas1', component: Graficas1Component, data: { titulo: 'Graficas', autor: 'Robert Mejia', description: 'contiene unas grafiacas interesantes' }},
          { path: 'promesas', component: PromesasComponent, data: { titulo: 'Promes', autor: 'Robert Mejia' }},
          { path: 'rxjs', component:  RxjsComponent, data: { titulo: 'Rxjs', autor: 'Robert Mejia' }},
          { path: 'account-setting', component: AccountSettingComponent, data: { titulo: 'Themes', autor: 'Robert Mejia' }},
          { path: 'profile', component: ProfileComponent, data: { titulo: 'Profile' } },
          { path: 'search/:texto', component: BuscadorComponent, data: { titulo: 'Buscador' } },
          // MAntenimiento
          { 
            path: 'usuarios', component: UsuariosComponent,
            canActivate: [ AdminGuard ],
            data: { titulo: 'Mantenimiento Usuarios' } },

          { path: 'medicos', component: MedicosComponent, data: { titulo: 'Mantenimiento Medicos' } },
          { path: 'medico/:id', component: MedicoComponent, data: { titulo: 'Mantenimiento Medico' } },
          { path: 'hospitales', component: HospitalesComponent, data: { titulo: 'Mantenimiento Hospitales' } },
          
          { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
        ];


  export const PAGES_ROUTER = RouterModule.forChild(pagesRoutes);
