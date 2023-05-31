import { Component, EventEmitter, OnInit, Output, Renderer2 } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first, pipe } from 'rxjs';
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
postData() {
  if (this.angForm.valid) {
    const stud_testimonial = this.angForm.value.stud_testimonial;
    this.dataService.insertTestimonials(stud_testimonial)
      .subscribe(
        data => {
          console.log('Response received:', data);
          // Handle success
        },
        error => {
          console.error('Error occurred:', error);
          // Handle error
        }
      );
  }
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

