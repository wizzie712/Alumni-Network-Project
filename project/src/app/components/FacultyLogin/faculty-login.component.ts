import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-faculty-login',
  templateUrl: './faculty-login.component.html',
  styleUrls: ['./faculty-login.component2.css']
})
export class FacultyLoginComponent implements OnInit{
  [x: string]: any;
  constructor() { }

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

loginSubmitted(){
  console.log(this.loginForm);
  // document.write("login successful");
  alert('Login Successful');

}
}

