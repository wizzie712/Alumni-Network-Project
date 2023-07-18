import { Component } from '@angular/core';
import { ApiService } from 'src/app/api.service';
@Component({
  selector: 'app-addnotice',
  templateUrl: './addnotice.component.html',
  styleUrls: ['./addnotice.component.css']
})
export class AddnoticeComponent {

  notices: any[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.fetchNotices();
  }

  deleteUser(notice_id:any){
    //console.log(id);
    this.apiService.deleteNotice(notice_id).subscribe(
      (result:any)=>{
        this.notices = result;
        window.location.reload();
      })
  }
  fetchNotices() {
    this.apiService.getNotices().subscribe(
      (response: any) => {
        this.notices = response;
      },
      (error: any) => {
        console.error('Error occurred:', error);
      }
    );
  }
  
}
