import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/api.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-editnotice',
  templateUrl: './editnotice.component.html',
  styleUrls: ['./editnotice.component.css']
})
export class EditnoticeComponent implements OnInit {
  angForm: FormGroup;
  noticeId: any;
  isPopupVisible = false;

  constructor(
    private fb: FormBuilder,
    private dataService: ApiService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.angForm = this.fb.group({
      notice_info: ['', Validators.required],
      notice_link: [null, Validators.required]
    });
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      //alert(params['id']);
      this.noticeId = params['id'];
      this.fetchNoticeDetails();
    });
  }

  fetchNoticeDetails() {
    if (this.noticeId) {
      this.dataService.fetchNoticeById(this.noticeId)
        .subscribe(
          response => {
            console.log('Response received:', response);
            this.angForm.patchValue({
              notice_info: response.notice_info,
              notice_link: null
            });
          },
          error => {
            console.error('Error occurred:', error);
          }
        );
    }
  }

  closePopup() {
    console.log('Popup closed');
    this.isPopupVisible = false;
  }

  uploadFile(event: any) {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      this.angForm.patchValue({
        notice_link: file
      });
    }
  }

  sendFileToServer() {
    //alert(this.noticeId);
    this.dataService.editNotice(this.noticeId, this.angForm.value.notice_info, this.angForm.value.notice_link)
      .subscribe(
        response => {
          console.log('Response received:', response);
          this.router.navigate(['/addnotice']);
        },
        error => {
          console.error('Error occurred:', error);
        }
      );
}}
