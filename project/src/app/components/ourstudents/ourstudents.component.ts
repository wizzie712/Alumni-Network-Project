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
    this.router.navigate(['/studentlogin']).then(() => {
      window.location.reload();
    });
  }
}
