import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-student-profile',
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.css']
})
export class StudentProfileComponent implements OnInit {
  [x: string]: any;
  angForm: FormGroup;
  constructor(private fb: FormBuilder,private dataService: ApiService,private router:Router) {
  this.angForm = this.fb.group({
    stud_name: ['', Validators.required],
  stud_email: ['', [Validators.required,Validators.minLength(1), Validators.email]],
  stud_dob: ['', Validators.required],
  stud_designation: ['', Validators.required],
  stud_company: ['', Validators.required],
  stud_linkedin: ['', Validators.required],
  stud_mobile: ['', Validators.required],
  stud_address: ['', Validators.required],
  stud_about: ['', Validators.required]
  });
  }
  ngOnInit() {
  }
  postdata(angForm1: { value: { stud_email: any; stud_name: any; stud_dob:any; stud_designation: any;
    stud_company:any; stud_linkedin: any; stud_mobile: any; stud_address:any; stud_about:any}; })
  {
  this.dataService.userlogin(angForm1.value.stud_email,angForm1.value.stud_name)
  .pipe(first())
  .subscribe(
  data => {
  //const redirect = this.dataService.redirectUrl ? this.dataService.redirectUrl : '/studentdashboard';
  this.router.navigate(['/studentdashboard']);
  },
  error => {
  });
  }
  get Email() { return this.angForm.get('stud_email') as FormControl; }
  get Name() { return this.angForm.get('stud_name') as FormControl; }
  get Dob() { return this.angForm.get('stud_dob') as FormControl; }
  get Designation() { return this.angForm.get('stud_designation') as FormControl; }
  get Company() { return this.angForm.get('stud_company') as FormControl; }
  get Address() { return this.angForm.get('stud_address') as FormControl; }
  get Mobile() { return this.angForm.get('stud_mobile') as FormControl; }
  get Linkedin() { return this.angForm.get('stud_linkedin') as FormControl; }
  get About() { return this.angForm.get('stud_about') as FormControl; }

}
