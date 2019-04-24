import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

//routes
import {  APP_ROUTER } from './app-routing.module';

//components
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';

// modulos personalizados
import { PagesModule } from './pages/pages.module';

//importaciones necesarias para trabajar con formularios
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';




// librerias

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
   
  ],
  imports: [
    BrowserModule,
    PagesModule,
    APP_ROUTER,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
