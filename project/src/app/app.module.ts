import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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

import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
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
import { PopupComponent } from './components/popup/popup.component';
import { OurstudentsComponent } from './components/ourstudents/ourstudents.component';
import { OurfacultyComponent } from './components/ourfaculty/ourfaculty.component';
import { FacultyprofileComponent } from './components/facultyprofile/facultyprofile.component';
import { FacultyinsightsComponent } from './components/facultyinsights/facultyinsights.component';
import { OuralumniComponent } from './components/ouralumni/ouralumni.component';
import { BatchesComponent } from './components/batches/batches.component';
import { AddNoticesComponent } from './components/add-notices/add-notices.component';

// import { BreakpointObserver,Breakpoints, BreakpointState } from '@angular/cdk/layout';

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
    PostJobsComponent,
    GuidanceComponent,
    StudentdashboardProfileComponent,
    CrudlistComponent,
    EditstudentComponent,
    AddstudentComponent,
    FacultycrudlistComponent,
    AddfacultyComponent,
    EditfacultyComponent,
    FacultyDashboardComponent,
    PopupComponent,
    OurstudentsComponent,
    OurfacultyComponent,
    FacultyprofileComponent,
    FacultyinsightsComponent,
    OuralumniComponent,
    BatchesComponent,
    AddNoticesComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    IonicModule,
    IonicModule.forRoot(),
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

