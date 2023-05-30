import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { data } from 'jquery';
import { first } from 'rxjs/operators';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-student-profile',
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.css']
})
export class StudentProfileComponent implements OnInit {
  profile_pic:any;
  profile_pic_url:any;
  loginbtn: boolean = false;
  logoutbtn: boolean = false;
  logged_in_username:any;
  [x: string]: any;
  angForm: FormGroup;
  angForm_profile_pic: FormGroup;
  constructor(private fb: FormBuilder,private dataService: ApiService,private router:Router) {
  this.angForm = this.fb.group({
  sp_name: ['', Validators.required],
  sp_email: ['', [Validators.required,Validators.minLength(1), Validators.email]],
  sp_dob: ['', Validators.required],
  sp_designation: ['', Validators.required],
  sp_company: ['', Validators.required],
  sp_linkedin: ['', Validators.required],
  sp_mobile: ['', Validators.required],
  sp_address: ['', Validators.required],
  sp_about: ['', Validators.required]
  });
  this.angForm_profile_pic= this.fb.group({
    profile_pic:[]
  })
  }
  ngOnInit() {
      this.dataService.getLoggedInName.subscribe(name => this.changeName(name));
    if(this.dataService.isLoggedIn())
    {
    console.log("loggedin");
    
    this.dataService.getStudentProfileDetails().subscribe(
      (result:any)=>{
        console.log(result.data);
        //this is for profile pic
       this.profile_pic_url=result.data['0'].sp_profile_image;
       //this.profile_pic_url='https://yt3.googleusercontent.com/MjEWybBlBXVZigapX__tR_PyJRx-_OGwEZfWZKyS_jJrlgeeF67h69wN2HOhFohiDA7YNeIG=s900-c-k-c0x00ffffff-no-rj';
        //this is for the form
        this.angForm.controls['sp_name'].setValue(result.data['0'].stud_name);
        this.angForm.controls['sp_dob'].setValue(result.data['0'].sp_dob);
        this.angForm.controls['sp_designation'].setValue(result.data['0'].sp_designation);
        this.angForm.controls['sp_company'].setValue(result.data['0'].sp_company);
        this.angForm.controls['sp_linkedin'].setValue(result.data['0'].sp_linkedin);
        this.angForm.controls['sp_mobile'].setValue(result.data['0'].sp_mobile);
        this.angForm.controls['sp_address'].setValue(result.data['0'].sp_address);
        this.angForm.controls['sp_about'].setValue(result.data['0'].sp_about);
        //this.profile_pic = result.data;
      }
    )
    this.loginbtn=false;
    this.logoutbtn=true
    this.logged_in_username = this.dataService.getUsername();
    this.angForm.controls['sp_email'].setValue(this.dataService.getEmail());
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
  uploadfile(event:any){
    const file =  event.target.files ? event.target.files[0] : '';
    //console.log(file); 
    this.angForm_profile_pic.patchValue({
      profile_pic: file
    });
    this.angForm_profile_pic.get('profile_pic')?.updateValueAndValidity()
  }
  mini_profile_save(){
    //console.log(this.angForm_profile_pic.value);
    //alert(student_name.value+"  "+ student_profile_description.value );
    this.dataService.updateminiprofile(this.angForm_profile_pic).pipe(first())
    .subscribe(
    data => {
      if(data.status == 'fail'){
        alert(data.message);
        console.log(data.message);
      }
      else{
        this.router.navigate(['/studentprofile']).then(()=>{
          window.location.reload();
        });
      }
    },
    error => {
      alert("error while updating profile pic mini profile"+error.message);
    });

  }

  postdata(angForm1: { value: { sp_name:any, sp_email:any, sp_dob:any, sp_designation:any, sp_company:any, sp_linkedin:any, sp_mobile: any, sp_address:any,sp_about:any}; })
  {
  this.dataService.insertstudentprofiledetails(angForm1.value.sp_name,angForm1.value.sp_email,angForm1.value.sp_dob,angForm1.value. sp_designation,angForm1.value.sp_company,angForm1.value.sp_linkedin,angForm1.value.sp_mobile,angForm1.value.sp_address,angForm1.value.sp_about)
  .pipe(first())
  .subscribe(
  data => {
  //const redirect = this.dataService.redirectUrl ? this.dataService.redirectUrl : '/studentdashboard';
  //window.location.reload();
  },
  error => {
  });
  }
  get Email() { return this.angForm.get('sp_email') as FormControl; }
  get Name() { return this.angForm.get('sp_name') as FormControl; }
  get Dob() { return this.angForm.get('sp_dob') as FormControl; }
  get Designation() { return this.angForm.get('sp_designation') as FormControl; }
  get Company() { return this.angForm.get('sp_company') as FormControl; }
  get Address() { return this.angForm.get('sp_address') as FormControl; }
  get Mobile() { return this.angForm.get('sp_mobile') as FormControl; }
  get Linkedin() { return this.angForm.get('sp_linkedin') as FormControl; }
  get About() { return this.angForm.get('sp_about') as FormControl; }

}