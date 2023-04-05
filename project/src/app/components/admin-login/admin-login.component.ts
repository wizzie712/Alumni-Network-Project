import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit{

  loginForm = new FormGroup({
    logemail: new FormControl("", [
      Validators.required,
      Validators.email]),
    logpassword: new FormControl("", [
      Validators.required,
      Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{7,}')])
});

  [logemail: string]: any;
  constructor() { }

  ngOnInit(): void {
  }


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
// // if (logemail === 'anushka.salvi@spit.ac.in') {
// //   // console.log(this.form.value); // Process your form
// }

}
}


