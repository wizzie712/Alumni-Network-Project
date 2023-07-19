import { Component, OnInit, Renderer2 } from '@angular/core';
import StickyNavigation from './stickynavbar.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from 'src/app/api.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-batches',
  templateUrl: './batches.component.html',
  styleUrls: ['./batches.component.css']
})
export class BatchesComponent implements OnInit{
  loginbtn: boolean = false;
  logoutbtn: boolean = false;
  logged_in_username:any;
  angForm: FormGroup;
  batches:any;
  constructor(private fb: FormBuilder,private router: Router,private renderer: Renderer2,private dataService: ApiService) {
    this.angForm = this.fb.group ({})
  }
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
      this.dataService.getSbatches().subscribe(
        (result:any)=>{
          //console.log(result)
          this.batches  =  result;
          console.log(result);
        }
      )

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

  stickyNavigation: StickyNavigation | undefined;

  ngAfterViewInit() {
    this.stickyNavigation = new StickyNavigation();

}
loginSubmitted(){
  console.log(this.angForm);
  // document.write("login successful");
  const formValues = this.angForm.value;
  this.angForm.reset();

  // use the form values as needed
  console.log(formValues);

}
// logout()
//     {
//     this.dataService.deleteToken();
//     this.router.navigate(['/studentlogin']).then(()=>{
//       window.location.reload();
//     });
//     }

}
