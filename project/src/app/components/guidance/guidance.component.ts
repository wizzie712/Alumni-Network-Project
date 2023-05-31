import { Component,OnInit,Renderer2 } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import StickyNavigation from './stickynavbar.component.js';
import { ApiService } from 'src/app/api.service';
import { first } from 'rxjs';

@Component({
  selector: 'app-guidance',
  templateUrl: './guidance.component.html',
  styleUrls: ['./guidance.component.css']
})
export class GuidanceComponent implements OnInit{
  
  loginbtn: boolean = false;
  logoutbtn: boolean = false;
  logged_in_username:any;
  testimonials: any;

  stickyNavigation: StickyNavigation | undefined;

  constructor(private fb: FormBuilder,private router: Router,private renderer: Renderer2,private dataService: ApiService) {}
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
      
      this.dataService.getTestimonials().subscribe(
        (testimonials: any[]) => {
          this.testimonials = testimonials;
        },
        (error) => {
          console.log(error);
        }
      );
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

    


  ngAfterViewInit() {
    this.stickyNavigation = new StickyNavigation();

}



showPopup = false;

  openPopup() {
    this.showPopup = true;
  }

  closePopup() {
    this.showPopup = false;
  }

}

