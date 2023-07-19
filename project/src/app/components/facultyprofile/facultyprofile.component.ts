import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import StickyNavigation from './stickynavbar.component';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-facultyprofile',
  templateUrl: './facultyprofile.component.html',
  styleUrls: ['./facultyprofile.component.css']
})
export class FacultyprofileComponent implements OnInit {
  profile_pic:any;
  profile_pic_url:any;
  faculty_name_bolte:any;
  fp_designation_bolte:any;
  loginbtn: boolean = false;
  logoutbtn: boolean = false;
  logged_in_username:any;

  // to enable edit in input boxes
  isInputDisabled: boolean = true;
  isEditMode: boolean = false;
  notEditMode: boolean = true;

  stickyNavigation: StickyNavigation | undefined;

  [x: string]: any;
  angForm: FormGroup;
  angForm_profile_pic: FormGroup;
  constructor(private alertController: AlertController, private fb: FormBuilder,private router: Router,private renderer: Renderer2,private dataService: ApiService,private http: HttpClient) {
  this.angForm = this.fb.group({
    faculty_name: ['', Validators.required],
    fp_email: ['', [Validators.required,Validators.minLength(1), Validators.email]],
    fp_dob: ['', Validators.required],
    fp_aoi: ['', Validators.required],
    fp_dept: ['', Validators.required],
    fp_designation: ['', Validators.required],
    fp_linkedin: ['', Validators.required],
    fp_mobile: ['', Validators.required],
  });
  this.angForm_profile_pic= this.fb.group({
    profile_pic:[]
  })

}
  ngOnInit(): void {
    this.dataService.getLoggedInName.subscribe(name => this.changeName(name));
    if(this.dataService.isLoggedIn())
    {
    console.log("loggedin");
    this.dataService.getFacultyProfileDetails().subscribe(
      (result:any)=>{
        console.log(result.data);
        //this is for profile pic
       this.profile_pic_url=result.data['0'].fp_profile_image;
       this.faculty_name_bolte=result.data['0'].faculty_name;
       this.fp_designation_bolte = result.data['0'].fp_designation;
       //this.profile_pic_url='https://yt3.googleusercontent.com/MjEWybBlBXVZigapX__tR_PyJRx-_OGwEZfWZKyS_jJrlgeeF67h69wN2HOhFohiDA7YNeIG=s900-c-k-c0x00ffffff-no-rj';
        //this is for the form
        this.angForm.controls['faculty_name'].setValue(result.data['0'].faculty_name);
        this.angForm.controls['fp_dob'].setValue(result.data['0'].fp_dob);
        this.angForm.controls['fp_aoi'].setValue(result.data['0'].fp_aoi);
        this.angForm.controls['fp_designation'].setValue(result.data['0'].fp_designation);
        this.angForm.controls['fp_dept'].setValue(result.data['0'].fp_dept);
        this.angForm.controls['fp_linkedin'].setValue(result.data['0'].fp_linkedin);
        this.angForm.controls['fp_mobile'].setValue(result.data['0'].fp_mobile);
        //this.profile_pic = result.data;
      }
    )


    this.loginbtn=false;
    this.logoutbtn=true
    this.logged_in_username = this.dataService.getUsername();
    this.angForm.controls['fp_email'].setValue(this.dataService.getEmail());
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
    this.router.navigate(['/facultylogin']).then(()=>{
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
      this.dataService.updateminiprofilefaculty(this.angForm_profile_pic).pipe(first())
      .subscribe(
        async (data) => {
          const alert = await this.alertController.create({
            header: 'Woohoo!',
            message: 'Profile picture has been successfully edited',
            buttons: [
              {
                text: 'OK',

              },
            ],
            cssClass: 'alert-middle',
          });

          await alert.present();
        },
      );
    }
    postdata(angForm1: { value: {faculty_name:any, fp_email:any, fp_mobile:any, fp_dob:any, fp_aoi:any, fp_linkedin:any, fp_designation:any, fp_dept: any}; })
    {
    this.dataService.insertfacultyprofiledetails(angForm1.value.faculty_name,angForm1.value.fp_email,angForm1.value.fp_mobile,angForm1.value.fp_dob,angForm1.value.fp_aoi,angForm1.value.fp_linkedin,angForm1.value.fp_designation,angForm1.value.fp_dept)
    .pipe(first())
    .subscribe(
      async (data) => {
        const alert = await this.alertController.create({
          header: 'Woohoo!',
          message: 'Profile picture has been successfully edited',
          buttons: [
            {
              text: 'OK',

            },
          ],
          cssClass: 'alert-middle',
        });

        await alert.present();
      },
    );
  }
    get Email() { return this.angForm.get('fp_email') as FormControl; }
    get Name() { return this.angForm.get('faculty_name') as FormControl; }
    get Dob() { return this.angForm.get('fp_dob') as FormControl; }
    get AOI(){return this.angForm.get('fp_aoi') as FormControl;}
    get Designation() { return this.angForm.get('fp_designation') as FormControl; }
    get Dept() { return this.angForm.get('fp_dept') as FormControl; }
    get Mobile() { return this.angForm.get('fp_mobile') as FormControl; }
    get Linkedin() { return this.angForm.get('fp_linkedin') as FormControl; }
}
