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

  ngAfterViewInit() {
    this.stickyNavigation = new StickyNavigation();

}

loginSubmitted(){
  console.log(this.loginForm);
  // document.write("login successful");


}
showPopupFlag: boolean = false;

  showPopup() {
    this.showPopupFlag = true;
  }

  hidePopup() {
    this.showPopupFlag = false;
  }



}
