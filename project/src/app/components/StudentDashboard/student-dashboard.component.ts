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
    logemail: new FormControl("", [
      Validators.required,
      Validators.email]),
    logpassword: new FormControl("", [
      Validators.required])
});

get Email(): FormControl {
  return this.loginForm.get("logemail") as FormControl;
}

get Password(): FormControl {
  return this.loginForm.get("logpassword") as FormControl;
}

  ngAfterViewInit() {
    this.stickyNavigation = new StickyNavigation();

}

loginSubmitted(){
  console.log(this.loginForm);
  // document.write("login successful");
  alert('Login Successful');
  this.router.navigate(['/studentdashboard']);

}


}
