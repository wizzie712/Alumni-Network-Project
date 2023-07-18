import { Component, EventEmitter, Output, Renderer2 } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-popupfaculty',
  templateUrl: './popupfaculty.component.html',
  styleUrls: ['./popupfaculty.component.css']
})
export class PopupfacultyComponent {
  angForm: FormGroup;
  constructor(private fb: FormBuilder,private router: Router,private renderer: Renderer2,private dataService: ApiService) {
    this.angForm = this.fb.group({

      faculty_testimonial: new FormControl("", [
        Validators.required])

  });
}
postData() {
  if (this.angForm.valid) {
    const faculty_testimonial = this.angForm.value.faculty_testimonial;
    this.dataService.insertTestimonialsFaculty(faculty_testimonial)
      .subscribe(
        data => {
          console.log('Response received:', data);
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

