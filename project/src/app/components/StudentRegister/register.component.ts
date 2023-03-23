import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, NgForm } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  yearControl = new FormControl('');
  angForm: FormGroup;
  constructor(private fb: FormBuilder,private dataService: ApiService,private router:Router) {
  
  this.angForm = this.fb.group({
  stud_name: ['', Validators.required],
  stud_email: ['', [Validators.required,Validators.minLength(1), Validators.email]],
  stud_password: ['', [Validators.required,Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{7,}')]],
  stud_gender: ['', Validators.required],
  stud_batch: ['', Validators.required]
  });
  }

  ngOnInit(): void {
  }
years = Array.from({length: 18}, (_, i) => 2025 - i);
postdata(angForm1: { value: { stud_name:any; stud_email: any; stud_password: any; stud_gender: any; stud_batch: any; }; }){
    //console.log(angForm1.value.ucid);
this.dataService.userregistration(angForm1.value.stud_name,angForm1.value.stud_email,angForm1.value.stud_password,angForm1.value.stud_gender,angForm1.value.stud_batch)
.pipe(first())
.subscribe(
data => {
this.router.navigate(['/studentlogin']);
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


  // registerSubmitted(){
  //   console.log(this.angForm);
  //   //document.write("Registration submitted");
  //  alert("Registration Submitted");
  //  this.router.navigate(['/studentlogin']);



  // }

  // loginpage(){
  //   this.router.navigate(['/login']);

  // }

}
