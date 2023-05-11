import { Component,OnInit,Renderer2 } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import StickyNavigation from './stickynavbar.component.js';
import { ApiService } from 'src/app/api.service';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.css']
})
export class StudentDashboardComponent implements OnInit{


  stickyNavigation: StickyNavigation | undefined;
  companydetails: any;
  constructor(private router: Router,private renderer: Renderer2,private dataService: ApiService,private http: HttpClient) {}
  ngOnInit(): void {
    this.dataService.getScompanydetails().subscribe(
      (result:any)=>{
        //console.log(result)
        this.companydetails  =  result;
        console.log(result);
      }
    )
  }

  ngAfterViewInit() {
    this.stickyNavigation = new StickyNavigation();

}

// showPopupFlag: boolean = false;

//   showPopup() {
//     this.showPopupFlag = true;
//   }

//   hidePopup() {
//     this.showPopupFlag = false;
//   }



}
