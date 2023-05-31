import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { data } from 'jquery';
import { first } from 'rxjs/operators';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-studentdashboard-profile',
  templateUrl: './studentdashboard-profile.component.html',
  styleUrls: ['./studentdashboard-profile.component.css']
})
export class StudentdashboardProfileComponent implements OnInit{
    profile_pic:any;
    profile_pic_url:any;
    stud_name_bolte:any;
    sp_designation_bolte:any;
    loginbtn: boolean = false;
    logoutbtn: boolean = false;
    logged_in_username:any;
    isInputDisabled: boolean = true;
    isEditMode: boolean = false;
    notEditMode: boolean = true;


    [x: string]: any;
    angForm: FormGroup;
    angForm_profile_pic: FormGroup;
    constructor(private fb: FormBuilder,private dataService: ApiService,private router:Router) {
    this.angForm = this.fb.group({
    stud_name: ['', Validators.required],
    sp_email: ['', [Validators.required,Validators.minLength(1), Validators.email]],
    sp_dob: ['', Validators.required],
    sp_location: ['', Validators.required],
    sp_designation: ['', Validators.required],
    sp_company: ['', Validators.required],
    sp_linkedin: ['', Validators.required],
    sp_mobile: ['', Validators.required],
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
       // enabling input boxes

      this.dataService.getStudentProfileDetails().subscribe(
        (result:any)=>{
          console.log(result.data);
          //this is for profile pic
         this.profile_pic_url=result.data['0'].sp_profile_image;
         this.stud_name_bolte=result.data['0'].stud_name;
         this.sp_designation_bolte = result.data['0'].sp_designation;
         //this.profile_pic_url='https://yt3.googleusercontent.com/MjEWybBlBXVZigapX__tR_PyJRx-_OGwEZfWZKyS_jJrlgeeF67h69wN2HOhFohiDA7YNeIG=s900-c-k-c0x00ffffff-no-rj';
          //this is for the form
          this.angForm.controls['stud_name'].setValue(result.data['0'].stud_name);
          this.angForm.controls['sp_dob'].setValue(result.data['0'].sp_dob);
          this.angForm.controls['sp_location'].setValue(result.data['0'].sp_location);
          this.angForm.controls['sp_designation'].setValue(result.data['0'].sp_designation);
          this.angForm.controls['sp_company'].setValue(result.data['0'].sp_company);
          this.angForm.controls['sp_linkedin'].setValue(result.data['0'].sp_linkedin);
          this.angForm.controls['sp_mobile'].setValue(result.data['0'].sp_mobile);
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

         // enabling input boxes
    enableInput() {
      this.isInputDisabled = false;
      this.isEditMode = true;
      this.notEditMode = false;
    }

    closeEditMode() {
      this.isEditMode = false;
      this.isInputDisabled = true;
      this.notEditMode = true;
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
          this.router.navigate(['/studentdashboardprofile']).then(()=>{
            window.location.reload();
          });
        }
      },
      error => {
        alert("error while updating profile pic mini profile"+error.message);
      });

    }

    postdata(angForm1: { value: { sp_name:any, sp_email:any, sp_dob:any, sp_location:any, sp_designation:any, sp_company:any, sp_linkedin:any, sp_mobile: any}; })
    {
    this.dataService.insertstudentprofiledetails(angForm1.value.sp_name,angForm1.value.sp_email,angForm1.value.sp_dob,angForm1.value.sp_location,angForm1.value.sp_designation,angForm1.value.sp_company,angForm1.value.sp_linkedin,angForm1.value.sp_mobile)
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
    get Location(){return this.angForm.get('sp_location') as FormControl;}
    get Designation() { return this.angForm.get('sp_designation') as FormControl; }
    get Company() { return this.angForm.get('sp_company') as FormControl; }
    get Mobile() { return this.angForm.get('sp_mobile') as FormControl; }
    get Linkedin() { return this.angForm.get('sp_linkedin') as FormControl; }

  }
