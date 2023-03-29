import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, NgForm } from '@angular/forms';
import { first } from 'rxjs/operators';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
@Component({
  selector: 'app-editstudent',
  templateUrl: './editstudent.component.html',
  styleUrls: ['./editstudent.component.css']
})
export class EditstudentComponent implements OnInit {
  yearControl = new FormControl('');
  angForm: FormGroup;
  url_stud_email:any;
  constructor(private fb: FormBuilder,private dataService: ApiService,private router:Router,private route: ActivatedRoute) {
  
  this.angForm = this.fb.group({
  stud_name: ['', Validators.required],
  stud_email: ['', [Validators.required,Validators.minLength(1), Validators.email]],
  stud_password: ['', [Validators.required,Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{7,}')]],
  stud_gender: ['', Validators.required],
  stud_batch: ['', Validators.required]
  });
  }

  ngOnInit() {
    this.url_stud_email = this.route.snapshot.params['stud_email'];
      console.log(this.url_stud_email);
      //this.angForm.value.ucid = this.url_ucid;
      this.angForm.controls['stud_email'].setValue(this.url_stud_email);
      this.dataService.getSingleStudent(this.url_stud_email).subscribe((
        (data:any)=>{
          console.log(data);
          console.log(data.data['0'].email);
          this.angForm.controls['stud_name'].setValue(data.data['0'].stud_name);
          this.angForm.controls['stud_email'].setValue(data.data['0'].stud_email);
          this.angForm.controls['stud_password'].setValue(data.data['0'].stud_password);
          this.angForm.controls['stud_gender'].setValue(data.data['0'].stud_gender);
          this.angForm.controls['stud_batch'].setValue(data.data['0'].stud_batch);
        }
      ))
  }
years = Array.from({length: 18}, (_, i) => 2025 - i);
postdata(angForm1: { value: { stud_name:any; stud_email: any; stud_password: any; stud_gender: any; stud_batch: any; }; }){
    //console.log(angForm1.value.ucid);
this.dataService.editStudent(angForm1.value.stud_name,angForm1.value.stud_email,angForm1.value.stud_password,angForm1.value.stud_gender,angForm1.value.stud_batch)
.pipe(first())
.subscribe(
data => {
this.router.navigate(['/crudlist']);
},
error => {
});
}
  //registrationMessage: any = {};

  get Name(): FormControl {
    return this.angForm.get("stud_name") as FormControl;
  }

  get Email(): FormControl {
    return this.angForm.get("stud_email") as FormControl;
  }

  get Password(): FormControl {
    return this.angForm.get("stud_password") as FormControl;
  }

  get Gender(): FormControl {
    return this.angForm.get("stud_gender") as FormControl;
  }

  get Year(): FormControl {
    return this.angForm.get("stud_batch") as FormControl;
  }


}
