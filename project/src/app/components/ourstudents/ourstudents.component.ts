import { Component, OnInit, Renderer2 } from '@angular/core';
import StickyNavigation from './stickynavbar.component.js';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
@Component({
  selector: 'app-ourstudents',
  templateUrl: './ourstudents.component.html',
  styleUrls: ['./ourstudents.component.css']
})
export class OurstudentsComponent implements OnInit {

  sloginbtn: boolean = false;
  logoutbtn: boolean = false;
  logged_in_username: any;
  studentdetails: any[] = [];
  profile_pic_url: any;
  stud_name_url: any;
  sp_designation_url: any;
  sp_linked_in_url:any;
  stickyNavigation: StickyNavigation | undefined;

  constructor(
    private router: Router,
    private renderer: Renderer2,
    private dataService: ApiService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.dataService.getLoggedInName.subscribe(name => this.changeName(name));
    if (this.dataService.isLoggedIn()) {
      console.log("loggedin");

      this.dataService.getStudentDetails().subscribe(
        (result: any) => {
          console.log(result.data);
          if (result.success === 'success' && result.data.length > 0) {
            this.studentdetails = result.data; // Assign fetched data to studentdetails array
            const student = this.studentdetails[0];
            this.profile_pic_url = student.sp_profile_image;
            this.stud_name_url = student.stud_name;
            this.sp_designation_url = student.sp_designation;
            this.sp_linked_in_url = student.sp_linkedin;
          } else {
            console.log(result.message || 'No results found');
          }
        },
        error => {
          console.log("Error occurred while fetching");
        }
      );
      this.sloginbtn = false;
      this.logoutbtn = true;
      this.logged_in_username = this.dataService.getUsername();
      console.log(this.logged_in_username);
    } else {
      this.sloginbtn = true;
      this.logoutbtn = false;
    }
  }

  private changeName(name: boolean): void {
    this.logoutbtn = name;
    this.sloginbtn = !name;
  }

  logout() {
    this.dataService.deleteToken();
    this.router.navigate(['/facultylogin']).then(() => {
      window.location.reload();
    });
  }
}
