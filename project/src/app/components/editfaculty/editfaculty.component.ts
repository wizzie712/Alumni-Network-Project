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
  faculty_email: ['', [Validators.required,Validators.minLength(1), Validators.email]],
  faculty_dept: ['', Validators.required],
  faculty_qualification: ['', Validators.required],
  faculty_designation: ['', Validators.required],
  faculty_password: ['', [Validators.required,Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{7,}')]],
  faculty_aoi: ['', Validators.required],
});
  }

  ngOnInit() {
    this.url_faculty_email = this.route.snapshot.params['faculty_email'];
      console.log(this.url_faculty_email);
      //this.angForm.value.ucid = this.url_ucid;
      this.angForm.controls['faculty_email'].setValue(this.url_faculty_email);

      this.dataService.getSingleFaculty(this.url_faculty_email).subscribe((
        (data:any)=>{
          console.log(data);
          //console.log(data.data['0'].email);
          this.angForm.controls['faculty_name'].setValue(data.data['0'].faculty_name);
          this.angForm.controls['faculty_email'].setValue(data.data['0'].faculty_email);
          this.angForm.controls['faculty_dept'].setValue(data.data['0'].faculty_dept);
          this.angForm.controls['faculty_qualification'].setValue(data.data['0'].faculty_qualification);
          this.angForm.controls['faculty_designation'].setValue(data.data['0'].faculty_designation);
          this.angForm.controls['faculty_password'].setValue(data.data['0'].faculty_password);
          this.angForm.controls['faculty_aoi'].setValue(data.data['0'].faculty_aoi);
        }
      ))
  }
postdata(angForm1: { value: { faculty_name:any; faculty_email: any;faculty_dept:any;faculty_qualification:any;faculty_designation:any; faculty_password: any; faculty_aoi: any;}; }){
    //console.log(angForm1.value.ucid);
this.dataService.editFaculty(angForm1.value.faculty_name,angForm1.value.faculty_email,angForm1.value.faculty_dept,angForm1.value.faculty_qualification,angForm1.value.faculty_designation,angForm1.value.faculty_password,angForm1.value.faculty_aoi)
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
    return this.angForm.get("faculty_email") as FormControl;
  }
  get Dept(): FormControl {
    return this.angForm.get("faculty_dept") as FormControl;
  }
  get Qualification(): FormControl {
    return this.angForm.get("faculty_qualification") as FormControl;
  }
  get Designation(): FormControl {
    return this.angForm.get("faculty_designation") as FormControl;
  }
  get Password(): FormControl {
    return this.angForm.get("faculty_password") as FormControl;
  }
  get AOI(): FormControl {
    return this.angForm.get("faculty_aoi") as FormControl;
  }
 

}

