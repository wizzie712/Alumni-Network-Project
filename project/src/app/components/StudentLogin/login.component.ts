import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, NgForm, FormBuilder } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component2.css']
})
export class LoginComponent implements OnInit {
  [x: string]: any;
  angForm: FormGroup;
  constructor(private fb: FormBuilder,private dataService: ApiService,private router:Router) {
  this.angForm = this.fb.group({
  stud_email: ['', [Validators.required,Validators.minLength(1), Validators.email]],
  stud_password: ['', Validators.required]
  });
  }
  ngOnInit() {
  }
  postdata(angForm1: { value: { stud_email: any; stud_password: any; }; })
  {
  this.dataService.userlogin(angForm1.value.stud_email,angForm1.value.stud_password)
  .pipe(first())
  .subscribe(
  data => {
  const redirect = this.dataService.redirectUrl ? this.dataService.redirectUrl : '/studentdashboard';
  //this.router.navigate(['/studentdashboard']);
  window.location.href = redirect;
  },
  error => {
    alert("User name or password is incorrect")
  });
  }
  get Email() { return this.angForm.get('stud_email') as FormControl; }
  get Password() { return this.angForm.get('stud_password') as FormControl; }
  }

