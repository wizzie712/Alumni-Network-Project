import { Component,OnInit,Renderer2 } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import StickyNavigation from './stickynavbar.component.js';
import { ApiService } from 'src/app/api.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-guidance',
  templateUrl: './guidance.component.html',
  styleUrls: ['./guidance.component.css']
})
export class GuidanceComponent implements OnInit{
  loginbtn: boolean = false;
  logoutbtn: boolean = false;
  logged_in_username:any;

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
      
}

