import { Component,OnInit,Renderer2 } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import StickyNavigation from './stickynavbar.component.js';

@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.css']
})
export class StudentDashboardComponent implements OnInit{


  stickyNavigation: StickyNavigation | undefined;

  constructor(private router: Router,private renderer: Renderer2) {}
  ngOnInit(): void {
  }
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
