import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, NgForm } from '@angular/forms';
import { first } from 'rxjs/operators';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-addfaculty',
  templateUrl: './addfaculty.component.html',
  styleUrls: ['./addfaculty.component.css']
})
export class AddfacultyComponent implements OnInit {
  angForm: FormGroup;
  constructor(private fb: FormBuilder,private dataService: ApiService,private router:Router) {
  
  this.angForm = this.fb.group({
  faculty_email: ['', [Validators.required,Validators.minLength(1), Validators.email]],
  faculty_password: ['', [Validators.required,Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{7,}')]],
  });
  }

  ngOnInit(): void {
  }
postdata(angForm1: { value: { faculty_email: any; faculty_password: any; }; }){
    //console.log(angForm1.value.ucid);
this.dataService.facultyregistration(angForm1.value.faculty_email,angForm1.value.faculty_password)
.pipe(first())
.subscribe(
data => {
this.router.navigate(['/homepage']);
},
error => {
});
}

  get Email(): FormControl {
    return this.angForm.get("faculty_email") as FormControl;
  }

  get Password(): FormControl {
    return this.angForm.get("faculty_password") as FormControl;
  }

}
