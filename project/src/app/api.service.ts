import { Injectable, Output, EventEmitter } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Faculty, Users } from './users';
import { throwError } from 'rxjs';
import { Companydetails } from './companydetails';

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

  // public facultyregistration(faculty_name: any,faculty_email: any,faculty_dept: any,faculty_qualification: any,faculty_designation: any,faculty_password: any,faculty_aoi: any) {
  //   return this.httpClient.post<any>(this.baseUrl + '/register.php', {faculty_name,faculty_email,faculty_dept, faculty_qualification, faculty_designation, faculty_password, faculty_aoi })
  //   .pipe(map(Faculty => {
  //   return Faculty;
  //   }));
  //   }
  public facultyregistration(faculty_email: any,faculty_password: any) {
       return this.httpClient.post<any>(this.baseUrl + '/facultyregister.php', {faculty_email, faculty_password })
       .pipe(map(Faculty => {
        // this.setToken(Faculty[1].faculty_email);
        // this.setToken(Faculty[5].faculty_password);
        return Faculty;
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

getFaculty(){
  return this.httpClient.get<Users[]>(this.baseUrl+'/viewfaculty.php');
}

getSingleStudent(stud_email:any) {
  console.log(this.baseUrl+'/singleuser.php?stud_email='+stud_email);
  return this.httpClient.get<Users[]>(this.baseUrl+'/singleuser.php?stud_email='+stud_email);
} 

getSingleFaculty(faculty_email:any) {
  console.log(this.baseUrl+'/singlefaculty.php?faculty_email='+faculty_email);
  return this.httpClient.get<Users[]>(this.baseUrl+'/singlefaculty.php?faculty_email='+faculty_email);
} 

deleteStudent(stud_email:any) {
  console.log(stud_email);
  return this.httpClient.delete(this.baseUrl+'/deletestudent.php?stud_email='+ stud_email);  
}  

deleteFaculty(faculty_email:any) {
  console.log(faculty_email);
  return this.httpClient.delete(this.baseUrl+'/deletefaculty.php?faculty_email='+ faculty_email);  
}  

editStudent(stud_name: any,stud_email: any,stud_password: any, stud_gender: any, stud_batch: any) {
    //console.log(id);
    return this.httpClient.put(this.baseUrl+'/updatestudent.php', {stud_name ,stud_email, stud_password,stud_gender, stud_batch});  
  }  

editFaculty(faculty_name: any,faculty_email: any,faculty_dept: any, faculty_qualification: any,faculty_designation: any,faculty_password: any,faculty_aoi: any) {
    //console.log(id);
    return this.httpClient.put(this.baseUrl+'/updatefaculty.php', {faculty_name ,faculty_email,faculty_dept,faculty_qualification, faculty_designation, faculty_password, faculty_aoi});  
  }
  
insertcompanydetails(c_name:any, c_designation:any, c_jobtype:any, c_location :any, c_experience:any, c_salary:any, company_logo_file: any, c_suggestions:any){
  const formData: any = new FormData();
  formData.append("c_name",c_name);
  formData.append("c_designation",c_designation);
  formData.append("c_jobtype",c_jobtype);
  formData.append("c_location",c_location );
  formData.append("c_experience",c_experience);
  formData.append("c_salary",c_salary);
  formData.append("company_logo_file",company_logo_file);
  formData.append("c_suggestions",c_suggestions);
  // console.log("FormData Before sending HTTPRequest " +formData["c_name"]);
  return this.httpClient.post<any>(this.baseUrl + '/postjob1.php', formData)
    .pipe(
      catchError((error: any) => {
        console.error('Error occurred: ', error);
        console.log(company_logo_file);
        return throwError(error);
      }),
      map((response: any) => {
        console.log('Response received: ', response);
        //alert(response);
        return response;
      })
    ); 
}

getScompanydetails() {
  return this.httpClient.get<Users[]>(this.baseUrl+'/companydetailsview.php');
} 
// getsinglecompanydetails(company_id:any) {
//   //console.log(this.baseUrl+'/trash.php?id='+id);
//   return this.httpClient.get<Companydetails[]>(this.baseUrl+'/singlecompanyview.php?id='+company_id);
// }
}
