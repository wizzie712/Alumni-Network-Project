import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/StudentLogin/login.component';
import { RegisterComponent } from './components/StudentRegister/register.component';
import { FacultyRegisterComponent } from './components/FacultyRegister/faculty-register.component';
import { FacultyLoginComponent } from './components/FacultyLogin/faculty-login.component';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { AdminRegisterComponent } from './components/admin-register/admin-register.component';
import { HomePageComponent } from './components/home-page/home-page.component';

const routes: Routes = [
  { path: 'studentlogin', component: LoginComponent },
  { path: 'studentregister', component: RegisterComponent},
  { path: 'facultyregister', component:FacultyRegisterComponent},
  { path: 'facultylogin', component:FacultyLoginComponent},
  { path: 'adminlogin', component:AdminLoginComponent},
  { path: 'adminregister', component:AdminRegisterComponent},
  { path: 'homepage', component:HomePageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
