import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './components/StudentRegister/register.component';
import { LoginComponent } from './components/StudentLogin/login.component';
import { RouterModule } from '@angular/router';
import { FacultyLoginComponent } from './components/FacultyLogin/faculty-login.component';
import { FacultyRegisterComponent } from './components/FacultyRegister/faculty-register.component';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { AdminRegisterComponent } from './components/admin-register/admin-register.component';
import { HomePageComponent } from './components/home-page/home-page.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    FacultyLoginComponent,
    FacultyRegisterComponent,
    AdminLoginComponent,
    AdminRegisterComponent,
    HomePageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
