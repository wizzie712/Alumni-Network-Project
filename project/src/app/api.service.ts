import { Injectable, Output, EventEmitter } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Faculty, Users } from './users';

@Injectable({
  providedIn: 'any'
  })
  
  export class ApiService {
  
  redirectUrl: string | undefined;
  baseUrl:string = "http://localhost/project/php";
  @Output() getLoggedInName: EventEmitter<any> = new EventEmitter();
  constructor(private httpClient : HttpClient) { }
    
  public userlogin(stud_email: any, stud_password: any) {
  // alert(stud_email)
  console.log(stud_email,stud_password);
  return this.httpClient.post<any>(this.baseUrl + '/login.php', {stud_email, stud_password })
  .pipe(map(Users => {
  this.setToken(Users[0].stud_name);
  this.getLoggedInName.emit(true);
  return Users;
  }));
  }

  public facultylogin(faculty_email: any, faculty_password: any) {
    console.log(faculty_email,faculty_password);
    return this.httpClient.post<any>(this.baseUrl + '/faculty.php', {faculty_email, faculty_password })
    .pipe(map(Faculty => {
    this.setToken(Faculty[0].faculty_name);
    this.getLoggedInName.emit(true);
    return Faculty;
    }));
    }
    
  
  public userregistration(stud_name: any,stud_email: any,stud_password: any,stud_gender: any, stud_batch: any) {
  return this.httpClient.post<any>(this.baseUrl + '/register.php', {stud_name,stud_email,stud_password, stud_gender, stud_batch })
  .pipe(map(Users => {
  return Users;
  }));
  }
  
  //token
  setToken(token: string) {
  localStorage.setItem('token', token);
  }
  getToken() {
  return localStorage.getItem('token');
  }
  deleteToken() {
  localStorage.removeItem('token');
  }
  isLoggedIn() {
  const usertoken = this.getToken();
  if (usertoken != null) {
  return true
  }
  return false;
  }
  
 //service for crud on users(students)
getStudents() {
  return this.httpClient.get<Users[]>(this.baseUrl+'/viewstudent.php');
} 
getSingleStudent(stud_email:any) {
  console.log(this.baseUrl+'/trash.php?id='+stud_email);
  return this.httpClient.get<Users[]>(this.baseUrl+'/trash.php?id='+stud_email);
} 

deleteStudent(stud_email:any) {
  console.log(stud_email);
  return this.httpClient.delete(this.baseUrl+'/deletestudent.php?id='+ stud_email);  
}  

editStudent(stud_name: any,stud_email: any,stud_password: any, stud_gender: any, stud_batch: any) {
    //console.log(id);
    return this.httpClient.put(this.baseUrl+'/updatestudent.php', {stud_name ,stud_email, stud_password,stud_gender, stud_batch});  
  }  
    
  }
