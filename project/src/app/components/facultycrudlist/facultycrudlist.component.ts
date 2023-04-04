import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-facultycrudlist',
  templateUrl: './facultycrudlist.component.html',
  styleUrls: ['./facultycrudlist.component.css']
})
export class FacultycrudlistComponent implements OnInit {
  users:any;

  constructor(private dataService: ApiService,private http: HttpClient,private router:Router,) { }
  ngOnInit(): void {

    this.dataService.getFaculty().subscribe(
      (result:any)=>{
        //console.log(result)
        this.users  =  result;
      }
    )

  }

  deleteUser(faculty_email:any){
    //console.log(id);
    this.dataService.deleteFaculty(faculty_email).subscribe(
      (result:any)=>{
        this.users = result;
        window.location.reload();
      })
  }
}
