import { Component,OnInit,Renderer2 } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import StickyNavigation from './stickynavbar.component.js';
import { ApiService } from 'src/app/api.service';
import { first } from 'rxjs';

@Component({
  selector: 'app-post-jobs',
  templateUrl: './post-jobs.component.html',
  styleUrls: ['./post-jobs.component.css']
})
export class PostJobsComponent implements OnInit{


  stickyNavigation: StickyNavigation | undefined;
  angForm: FormGroup;
  constructor(private fb: FormBuilder,private router: Router,private renderer: Renderer2,private dataService: ApiService) {
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
      c_jobtype: new FormControl("", [
        Validators.required])
  });
  }

  ngOnInit(): void {
  }
  postdata(angForm1: { value: { c_name:any; c_designation: any; c_jobtype: any; c_location: any; c_experience: any; c_salary:any;c_suggestions:any}; }){
    //console.log(angForm1.value.ucid);
this.dataService.insertcompanydetails(angForm1.value.c_name,angForm1.value.c_designation,angForm1.value.c_jobtype,angForm1.value.c_location,angForm1.value.c_experience,angForm1.value.c_salary,angForm1.value.c_suggestions)
.pipe(first())
.subscribe(
data => {
  //this.router.navigate(['/studentdashboard']);
  window.location.reload();
 
},
error => {
});
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
