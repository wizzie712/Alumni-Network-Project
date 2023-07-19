import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  notices: any;
  companydetails: any;
  constructor(private router: Router,private renderer: Renderer2,private dataService: ApiService,private http: HttpClient) {}

  ngOnInit(): void {
    this.dataService.getTopNotices().subscribe(
        (data: any[]) => {
          this.notices = data;
        },
        (error) => {
          console.error('Error fetching notices:', error);
        }
      );
    
    this.dataService.getScompanydetails().subscribe(
      (result:any)=>{
        //console.log(result)
        this.companydetails  =  result;
        console.log(result);
      }
    )
  }
 
}
