import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
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
import { StudentDashboardComponent } from './components/student-dashboard/student-dashboard.component';
import { StudentDetailsComponent } from './components/student-details/student-details.component';
import { StudentProfileComponent } from './components/student-profile/student-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    FacultyLoginComponent,
    FacultyRegisterComponent,
    AdminLoginComponent,
    AdminRegisterComponent,
    HomePageComponent,
    StudentDashboardComponent,
    StudentDetailsComponent,
    StudentProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    IonicModule,
    IonicModule.forRoot(),
    ReactiveFormsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
