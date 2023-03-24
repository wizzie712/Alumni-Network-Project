import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, NgForm, FormBuilder } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-faculty-login',
  templateUrl: './faculty-login.component.html',
  styleUrls: ['./faculty-login.component2.css']
})
export class FacultyLoginComponent implements OnInit{
  [x: string]: any;
  angForm: FormGroup;
  constructor(private fb: FormBuilder,private dataService: ApiService,private router:Router) {
  this.angForm = this.fb.group({
  faculty_email: ['', [Validators.required,Validators.minLength(1), Validators.email]],
  faculty_password: ['', Validators.required]
  });
  }
  ngOnInit() {
  }
  postdata(angForm1: { value: { faculty_email: any; faculty_password: any; }; })
  {
  this.dataService.facultylogin(angForm1.value.faculty_email,angForm1.value.faculty_password)
  .pipe(first())
  .subscribe(
  data => {
  //const redirect = this.dataService.redirectUrl ? this.dataService.redirectUrl : '/studentdashboard';
  this.router.navigate(['/studentdashboard']);
  },
  error => {
  });
  }
  get Email() { return this.angForm.get('faculty_email') as FormControl; }
  get Password() { return this.angForm.get('faculty_password') as FormControl; }
  }

