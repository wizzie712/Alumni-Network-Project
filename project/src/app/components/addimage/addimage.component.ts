import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, NgForm } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-addimage',
  templateUrl: './addimage.component.html',
  styleUrls: ['./addimage.component.css']
})
export class AddimageComponent implements OnInit {
  angForm: FormGroup;
  constructor(private fb: FormBuilder,private dataService: ApiService,private router:Router) {
    this.angForm = this.fb.group({
      company_name: ['', [Validators.required,Validators.minLength(1), Validators.email]],
      company_logo_file:[null,Validators.required]
      });
   }

  ngOnInit(): void {
  }

  uploadfile(event:any){
    const file =  event.target.files ? event.target.files[0] : '';
    //console.log(file); 
    this.angForm.patchValue({
      company_logo_file: file
    });
    this.angForm.get('company_logo_file')?.updateValueAndValidity()
  }

  postdata(angForm1: { value: {company_name:any;  company_logo_file:any; }; }){
   
    console.log(angForm1.value.company_name);
    this.dataService.insertcompanydetails(angForm1.value.company_name, this.angForm.value.company_logo_file)
    .pipe(first())
    .subscribe(
    data => {
    this.router.navigate(['testimage']);
    },
    error => {});

    }
get company_name(){return this.angForm.get('company_name');}
}