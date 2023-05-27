import { Component, EventEmitter, OnInit, Output, Renderer2 } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit {

  angForm: FormGroup;
  constructor(private fb: FormBuilder,private router: Router,private renderer: Renderer2,private dataService: ApiService) {
    this.angForm = this.fb.group({

      c_suggestions: new FormControl("", [
        Validators.required])

  });
}
postdata(angForm1: { value: { c_suggestions:any}; }){
//   //console.log(angForm1.value.ucid);
// this.dataService.insertcompanydetails(angForm1.value.c_suggestions)
// .pipe(first())
// .subscribe(
// data => {

// //this.router.navigate(['/studentdashboard']);
// window.location.reload();

// },
// error => {
// });
}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  @Output() closed = new EventEmitter<void>();

  closePopup() {
    this.closed.emit();
  }
}

  function ngOnInit() {
    throw new Error('Function not implemented.');
  }

