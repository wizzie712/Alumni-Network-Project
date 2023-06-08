import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, NgForm } from '@angular/forms';
import { first } from 'rxjs/operators';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-editfaculty',
  templateUrl: './editfaculty.component.html',
  styleUrls: ['./editfaculty.component.css']
})
export class EditfacultyComponent implements OnInit {
  angForm: FormGroup;
  url_faculty_email:any;
  constructor(private fb: FormBuilder,private dataService: ApiService,private router:Router,private route: ActivatedRoute) {
  
  this.angForm = this.fb.group({
  faculty_name: ['', Validators.required],
  fp_email: ['', [Validators.required,Validators.minLength(1), Validators.email]],
  fp_dept: ['', Validators.required],
  fp_designation: ['', Validators.required],
  fp_linkedin: ['', Validators.required],
  fp_password: ['', [Validators.required,Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{7,}')]],
  fp_aoi: ['', Validators.required],
});
  }

  ngOnInit() {
    this.url_faculty_email = this.route.snapshot.params['fp_email'];
      console.log(this.url_faculty_email);
      //this.angForm.value.ucid = this.url_ucid;
      this.angForm.controls['fp_email'].setValue(this.url_faculty_email);

      this.dataService.getSingleFaculty(this.url_faculty_email).subscribe((
        (data:any)=>{
          console.log(data);
          //console.log(data.data['0'].email);
          this.angForm.controls['faculty_name'].setValue(data.data['0'].faculty_name);
          this.angForm.controls['fp_email'].setValue(data.data['0'].fp_email);
          this.angForm.controls['fp_dept'].setValue(data.data['0'].fp_dept);
          this.angForm.controls['fp_designation'].setValue(data.data['0'].fp_designation);
          this.angForm.controls['fp_linkedin'].setValue(data.data['0'].fp_linkedin);
          this.angForm.controls['fp_aoi'].setValue(data.data['0'].fp_aoi);
        }
      ))
  }
postdata(angForm1: { value: { faculty_name:any; fp_email: any;fp_dept:any;fp_designation:any;fp_linkedin:any;fp_aoi: any;}; }){
    //console.log(angForm1.value.ucid);
this.dataService.editFaculty(angForm1.value.faculty_name,angForm1.value.fp_email,angForm1.value.fp_dept,angForm1.value.fp_designation,angForm1.value.fp_linkedin,angForm1.value.fp_aoi)
.pipe(first())
.subscribe(
data => {
this.router.navigate(['/facultycrudlist']);
},
error => {
});
}
  //registrationMessage: any = {};

  get Name(): FormControl {
    return this.angForm.get("faculty_name") as FormControl;
  }

  get Email(): FormControl {
    return this.angForm.get("fp_email") as FormControl;
  }
  get Dept(): FormControl {
    return this.angForm.get("fp_dept") as FormControl;
  }
  get Qualification(): FormControl {
    return this.angForm.get("fp_qualification") as FormControl;
  }
  get Designation(): FormControl {
    return this.angForm.get("fp_designation") as FormControl;
  }
  get Linkedin(): FormControl{
    return this.angForm.get("fp_linkedin") as FormControl;
  }
  get Password(): FormControl {
    return this.angForm.get("fp_password") as FormControl;
  }
  get AOI(): FormControl {
    return this.angForm.get("fp_aoi") as FormControl;
  }
 

}

