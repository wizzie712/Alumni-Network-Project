import { Component,OnInit,Renderer2 } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import StickyNavigation from './stickynavbar.component.js';
import { ApiService } from 'src/app/api.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-studentdashboard-profile',
  templateUrl: './studentdashboard-profile.component.html',
  styleUrls: ['./studentdashboard-profile.component.css']
})
export class StudentdashboardProfileComponent implements OnInit{
  loginbtn: boolean = false;
  logoutbtn: boolean = false;
  logged_in_username:any;

  stickyNavigation: StickyNavigation | undefined;

  constructor(private router: Router,private renderer: Renderer2,private dataService: ApiService,private http: HttpClient) {}
  ngOnInit(): void {
    this.dataService.getLoggedInName.subscribe(name => this.changeName(name));
    if(this.dataService.isLoggedIn())
    {
    console.log("loggedin");
    this.loginbtn=false;
    this.logoutbtn=true
    this.logged_in_username = this.dataService.getUsername();
    //this.logged_in_username = "mohit";
    console.log(this.logged_in_username);
    }
    else{
      this.loginbtn=true;
      this.logoutbtn=false
  
      }
  }
  private changeName(name: boolean): void {
    this.logoutbtn = name;
    this.loginbtn = !name;
    }
    logout()
    {
    this.dataService.deleteToken();
    this.router.navigate(['/studentlogin']).then(()=>{
      window.location.reload();
    });
    }
  
  salaries = ['Less than 8 lpa','10-15 lpa','10-15 lpa','15-20 lpa','20-25 lpa','25+ lpa'];
  jobtypes = ['Full time','Part-time','Temporary','Contract','Internship','Commission Only'];
  experiences = ['6 months','1 year','2 years','3 years','5 years','10 years','10+ years'];
  loginForm = new FormGroup({
    designation: new FormControl("", [
      Validators.required]),
    company: new FormControl("", [
      Validators.required]),
    experience: new FormControl("", [
      Validators.required]),
    salary: new FormControl("", [
      Validators.required]),
    location: new FormControl("", [
      Validators.required]),
    musthaves: new FormControl("", [
      Validators.required]),
    jobtype: new FormControl("", [
      Validators.required])
});

get Designation(): FormControl {
  return this.loginForm.get("designation") as FormControl;
}

get Company(): FormControl {
  return this.loginForm.get("company") as FormControl;
}

get Experience(): FormControl {
  return this.loginForm.get("experience") as FormControl;
}

get Salary(): FormControl {
  return this.loginForm.get("salary") as FormControl;
}

get Location(): FormControl {
  return this.loginForm.get("location") as FormControl;
}

get Musthaves(): FormControl {
  return this.loginForm.get("musthaves") as FormControl;
}

get Jobtype(): FormControl {
  return this.loginForm.get("jobtype") as FormControl;
}

  ngAfterViewInit() {
    this.stickyNavigation = new StickyNavigation();

}

loginSubmitted(){
  console.log(this.loginForm);
  // document.write("login successful");
  const formValues = this.loginForm.value;
  this.loginForm.reset();

  // use the form values as needed
  console.log(formValues);

}
showPopupFlag: boolean = false;

  showPopup() {
    this.showPopupFlag = true;
  }

  hidePopup() {
    this.showPopupFlag = false;
  }



}

