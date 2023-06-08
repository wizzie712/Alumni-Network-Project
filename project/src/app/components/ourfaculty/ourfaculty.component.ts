import { Component, OnInit, Renderer2 } from '@angular/core';
import StickyNavigation from './stickynavbar.component.js';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-ourfaculty',
  templateUrl: './ourfaculty.component.html',
  styleUrls: ['./ourfaculty.component.css']
})
export class OurfacultyComponent implements OnInit {

  facultydetails: any[] = [];
  sloginbtn: boolean = false;
  logoutbtn: boolean = false;
  logged_in_username: any;
  profile_pic_url:any;
  faculty_name_url:any;
  fp_designation_url:any;
  fp_linked_in_url:any;

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

      this.dataService.getFacultyDetails().subscribe(
        (result: any) => {
          console.log(result.data);
          if (result.success === 'success' && result.data.length > 0) {
            this.facultydetails = result.data; // Assign fetched data to facultydetails array
            const faculty = this.facultydetails[0];
            this.profile_pic_url = faculty.fp_profile_image;
            this.faculty_name_url = faculty.faculty_name;
            this.fp_designation_url = faculty.fp_designation;
            this.fp_linked_in_url = faculty.fp_linkedin;
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


