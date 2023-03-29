import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-crudlist',
  templateUrl: './crudlist.component.html',
  styleUrls: ['./crudlist.component.css']
})
export class CrudlistComponent implements OnInit {
  users:any;

  constructor(private dataService: ApiService,private http: HttpClient,private router:Router,) { }
  ngOnInit(): void {

    this.dataService.getStudents().subscribe(
      (result:any)=>{
        //console.log(result)
        this.users  =  result;
      }
    )

  }

  deleteUser(stud_email:any){
    //console.log(id);
    this.dataService.deleteStudent(stud_email).subscribe(
      (result:any)=>{
        this.users = result;
        window.location.reload();
      })
  }

}
