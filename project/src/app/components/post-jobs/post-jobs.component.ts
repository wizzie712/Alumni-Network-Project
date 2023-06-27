import { Component,OnInit,Renderer2 } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import StickyNavigation from './stickynavbar.component.js';
import { ApiService } from 'src/app/api.service';
import { first } from 'rxjs';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-post-jobs',
  templateUrl: './post-jobs.component.html',
  styleUrls: ['./post-jobs.component.css']
})
export class PostJobsComponent implements OnInit{

  loginbtn: boolean = false;
  logoutbtn: boolean = false;
  logged_in_username:any;
  stickyNavigation: StickyNavigation | undefined;
  angForm: FormGroup;
  constructor(private alertController: AlertController, private fb: FormBuilder,private router: Router,private renderer: Renderer2,private dataService: ApiService) {
    this.angForm = this.fb.group({
      c_designation: new FormControl("", [
        Validators.required]),
      c_name: new FormControl("", [
        Validators.required]),
      c_experience: new FormControl("", [
        Validators.required]),
      c_salary: new FormControl("", [
        Validators.required]),
      c_location: new FormControl("", [
        Validators.required]),
      c_suggestions: new FormControl("", [
        Validators.required]),
      company_logo_file:[null,Validators.required],
      c_jobtype: new FormControl("", [
        Validators.required])
  });
  }

  ngOnInit(): void {
    this.dataService.getLoggedInName.subscribe(name => this.changeName(name));
    if(this.dataService.isLoggedIn())
    {
    console.log("loggedin");
    this.loginbtn=false;
    this.logoutbtn=true
    this.logged_in_username = this.dataService.getUsername();
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
    this.angForm.patchValue({
      company_logo_file: file
    });
    this.angForm.get('company_logo_file')?.updateValueAndValidity()
  }
  postdata(angForm1: { value: { c_name:any; c_designation: any; c_jobtype: any; c_location: any; c_experience: any; c_salary:any; company_logo_file:any;c_suggestions:any}; }){
    //console.log(angForm1.value.ucid);
this.dataService.insertcompanydetails(angForm1.value.c_name,angForm1.value.c_designation,angForm1.value.c_jobtype,angForm1.value.c_location,angForm1.value.c_experience,angForm1.value.c_salary,angForm1.value.company_logo_file,angForm1.value.c_suggestions)
.pipe(first())
.subscribe(
  async (data) => {
    const alert = await this.alertController.create({
      header: 'Login Success',
      message: 'You have successfully logged in.',
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.router.navigate(['/studentdashboard']);
          },
        },
      ],
      cssClass: 'alert-middle',
    });

    await alert.present();
  },

);
}
  // salaries = ['Less than 8 lpa','10-15 lpa','10-15 lpa','15-20 lpa','20-25 lpa','25+ lpa'];
  // jobtypes = ['Full time','Part-time','Temporary','Contract','Internship','Commission Only'];
  // experiences = ['6 months','1 year','2 years','3 years','5 years','10 years','10+ years'];


get Designation(): FormControl {
  return this.angForm.get("c_designation") as FormControl;
}

get Company(): FormControl {
  return this.angForm.get("c_name") as FormControl;
}

get Jobtype(): FormControl {
  return this.angForm.get("c_jobtype") as FormControl;
}

get Experience(): FormControl {
  return this.angForm.get("c_experience") as FormControl;
}

get Salary(): FormControl {
  return this.angForm.get("c_salary") as FormControl;
}

get Location(): FormControl {
  return this.angForm.get("c_location") as FormControl;
}

get Suggestions(): FormControl {
  return this.angForm.get("c_suggestions") as FormControl;
}

  ngAfterViewInit() {
    this.stickyNavigation = new StickyNavigation();

}

loginSubmitted(){
  console.log(this.angForm);
  // document.write("login successful");
  const formValues = this.angForm.value;
  this.angForm.reset();

  // use the form values as needed
  console.log(formValues);

}
showPopupFlag: boolean = false;

  showPopup() {
    this.showPopupFlag = true;
  }

  hidePopup() {
    this.showPopupFlag = false;
  }



}
