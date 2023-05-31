import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import StickyNavigation from './stickynavbar.component';

@Component({
  selector: 'app-facultyprofile',
  templateUrl: './facultyprofile.component.html',
  styleUrls: ['./facultyprofile.component.css']
})
export class FacultyprofileComponent implements OnInit {

  loginbtn: boolean = false;
  logoutbtn: boolean = false;
  logged_in_username:any;

  // to enable edit in input boxes
  isInputDisabled = true;
  isEditMode: boolean = false;
  notEditMode: boolean = true;

  stickyNavigation: StickyNavigation | undefined;

  constructor(private router: Router,private renderer: Renderer2,private dataService: ApiService,private http: HttpClient) {}
  ngOnInit(): void {
    this.dataService.getLoggedInName.subscribe(name => this.changeName(name));
    if(this.dataService.isLoggedIn())
    {
    console.log("loggedin");
    this.loginbtn=false;
    this.logoutbtn=true
    this.logged_in_username = this.dataService.getUsername();
    //this.logged_in_username = "mohit";
    console.log(this.logged_in_username);
    }
    else{
      this.loginbtn=true;
      this.logoutbtn=false

      }
  }
  private changeName(name: boolean): void {
    this.logoutbtn = name;
    this.loginbtn = !name;
    }
    logout()
    {
    this.dataService.deleteToken();
    this.router.navigate(['/studentlogin']).then(()=>{
      window.location.reload();
    });
    }

    // enabling input boxes
    enableInput() {
      this.isInputDisabled = false;
      this.isEditMode = true;
      this.notEditMode = false;
    }

    closeEditMode() {
      this.isEditMode = false;
      this.isInputDisabled = true;
      this.notEditMode = true;
    }

}
