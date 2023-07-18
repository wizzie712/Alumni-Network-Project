import { Component, EventEmitter, Output, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-noticepopup',
  templateUrl: './noticepopup.component.html',
  styleUrls: ['./noticepopup.component.css']
})
export class NoticepopupComponent {
  angForm: FormGroup;
  isPopupVisible = false;

  constructor(
    private fb: FormBuilder,
    private dataService: ApiService,
    private cdr: ChangeDetectorRef, // Add ChangeDetectorRef
    private router: Router 
  ) {
    this.angForm = this.fb.group({
      notice_info: ['', Validators.required],
      notice_link: [null, Validators.required]
    });
  }

  openPopup() {
    this.isPopupVisible = true;
  }

  closePopup() {
    console.log('Popup closed');
    this.isPopupVisible = false;
    this.cdr.detectChanges(); // Trigger change detection
  }

  uploadFile(event: any) {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      //console.log(file);
      this.angForm.patchValue({
        notice_link: file
      });
    }
  }

  sendFileToServer(){
    //console.log(this.angForm.value.notice_info);
    //console.log(this.angForm.value.notice_link);
    this.dataService.insertnotice(this.angForm.value.notice_info, this.angForm.value.notice_link)
  .subscribe(
    response => {
      console.log('Response received:', response);
      // Handle the response from the server here
      // Redirect to the '/notices' page
      this.router.navigate(['/addnotice']);
    },
    error => {
      console.error('Error occurred:', error);
      // Handle the error here
    }
  );

  }
}
