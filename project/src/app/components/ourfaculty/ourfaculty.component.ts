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


  sloginbtn: boolean = false;
  logoutbtn: boolean = false;
  logged_in_username: any;

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


