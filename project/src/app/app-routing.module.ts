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
import { PostJobsComponent } from './components/post-jobs/post-jobs.component';
import { GuidanceComponent } from './components/guidance/guidance.component';
import { StudentdashboardProfileComponent } from './components/studentdashboard-profile/studentdashboard-profile.component';
import { CrudlistComponent } from './components/crudlist/crudlist.component';
import { EditstudentComponent } from './components/editstudent/editstudent.component';
import { AddstudentComponent } from './components/addstudent/addstudent.component';
import { FacultycrudlistComponent } from './components/facultycrudlist/facultycrudlist.component';
import { AddfacultyComponent } from './components/addfaculty/addfaculty.component';
import { EditfacultyComponent } from './components/editfaculty/editfaculty.component';
import { FacultyDashboardComponent } from './components/faculty-dashboard/faculty-dashboard.component';
import { OurstudentsComponent } from './components/ourstudents/ourstudents.component';
import { OurfacultyComponent } from './components/ourfaculty/ourfaculty.component';
import { FacultyprofileComponent } from './components/facultyprofile/facultyprofile.component';
import { FacultyinsightsComponent } from './components/facultyinsights/facultyinsights.component';
import { OuralumniComponent } from './components/ouralumni/ouralumni.component';

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
  { path: 'studentprofile', component:StudentProfileComponent},
  { path: 'postjobs', component:PostJobsComponent},
  { path: 'guidance', component:GuidanceComponent},
  { path: 'studentdashboardprofile', component: StudentdashboardProfileComponent},
  { path: 'crudlist',component:CrudlistComponent},
  { path: 'editstudent/:stud_email',component:EditstudentComponent},
  { path: 'addstudent', component:AddstudentComponent},
  { path: 'facultycrudlist',component:FacultycrudlistComponent},
  { path: 'facultydashboard',component:FacultyDashboardComponent},
  { path: 'addfaculty',component:AddfacultyComponent},
  { path: 'editfaculty/:faculty_email',component:EditfacultyComponent},
  { path: 'ourstudents', component:OurstudentsComponent},
  { path: 'ourfaculty', component:OurfacultyComponent},
  { path: 'facultyprofile', component:FacultyprofileComponent},
  { path: 'facultyinsights', component:FacultyinsightsComponent},
  { path: 'ouralumni', component:OuralumniComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
