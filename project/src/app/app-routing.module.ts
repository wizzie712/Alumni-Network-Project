import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/StudentLogin/login.component';
import { RegisterComponent } from './components/StudentRegister/register.component';
import { FacultyRegisterComponent } from './components/FacultyRegister/faculty-register.component';
import { FacultyLoginComponent } from './components/FacultyLogin/faculty-login.component';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { AdminRegisterComponent } from './components/admin-register/admin-register.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { StudentDashboardComponent } from './components/student-dashboard/student-dashboard.component';
import { StudentDetailsComponent } from './components/student-details/student-details.component';
import { StudentProfileComponent } from './components/student-profile/student-profile.component';

const routes: Routes = [
  { path: 'studentlogin', component: LoginComponent },
  { path: 'studentregister', component: RegisterComponent},
  { path: 'facultyregister', component:FacultyRegisterComponent},
  { path: 'facultylogin', component:FacultyLoginComponent},
  { path: 'adminlogin', component:AdminLoginComponent},
  { path: 'adminregister', component:AdminRegisterComponent},
  { path: 'homepage', component:HomePageComponent},
  { path: '', component:HomePageComponent},
  { path: 'studentdashboard', component:StudentDashboardComponent},
  { path: 'studentdetails', component:StudentDetailsComponent},
  { path: 'studentprofile', component:StudentProfileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
