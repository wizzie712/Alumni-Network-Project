import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { data } from 'jquery';
import { first } from 'rxjs/operators';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-ouralumni',
  templateUrl: './ouralumni.component.html',
  styleUrls: ['./ouralumni.component.css']
})
export class OuralumniComponent implements OnInit {
  studentdetails: any[] = [];
  sloginbtn: boolean = false;
  logoutbtn: boolean = false;
  logged_in_username: any;
  profile_pic_url: any;
  stud_name_url: any;
  sp_designation_url: any;
  sp_linked_in_url:any;

  searchQuery!: string;
  highlightedContent: string | undefined;



  search(): void {
    const escapedQuery = this.escapeRegExp(this.searchQuery);
    const regex = new RegExp(`(${escapedQuery})`, 'gi');
    const pageContent = this.elementRef.nativeElement.innerHTML;
    this.highlightedContent = pageContent.replace(regex, '<mark>$1</mark>');
  }

  escapeRegExp(query: string): string {
    return query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }


  constructor(private elementRef: ElementRef, private fb: FormBuilder,private dataService: ApiService,private router:Router) {}

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

  logout()
  {
  this.dataService.deleteToken();
  this.router.navigate(['/studentlogin']).then(()=>{
    window.location.reload();
  });
  }
}
