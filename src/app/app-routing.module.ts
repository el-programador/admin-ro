
import { Routes, RouterModule } from '@angular/router';

//components
import { LoginComponent } from './login/login.component';
import { NopagefoundComponent } from './shared/nopagefound/nopagefound.component';
import { RegisterComponent } from './login/register.component';
import { PagesComponent } from './pages/pages.component';
import { LoginGuardsGuard } from './services/service.index';

const routes: Routes = [

  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent},
  // loazy load
  {
    path: '',
    component: PagesComponent,
    canActivate: [ LoginGuardsGuard ],
    loadChildren: './pages/pages.module#PagesModule'
  },
  { path: '**', component: NopagefoundComponent  },
];

export const APP_ROUTER = RouterModule.forRoot(routes, { useHash: true} );
 
