import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-testimage',
  templateUrl: './testimage.component.html',
  styleUrls: ['./testimage.component.css']
})
export class TestimageComponent implements OnInit {
  companydetails: any;

  constructor(private dataService: ApiService,private http: HttpClient,private router:Router,) { }
  ngOnInit(): void {

    this.dataService.getScompanydetails().subscribe(
      (result:any)=>{
        //console.log(result)
        this.companydetails  =  result;
        console.log(result);
      }
    )

  }

}

