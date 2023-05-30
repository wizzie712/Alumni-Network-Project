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
  this.setToken(Users[0].stud_name,Users[0].stud_email);
  this.getLoggedInName.emit(true);
  return Users;
  }));
  }

  public facultylogin(faculty_email: any, faculty_password: any) {
    console.log(faculty_email,faculty_password);
    return this.httpClient.post<any>(this.baseUrl + '/faculty.php', {faculty_email, faculty_password })
    .pipe(map(Faculty => {
    this.setToken(Faculty[0].faculty_name,Faculty[0].faculty_email);
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
  setToken(token: string,email:string) {
  localStorage.setItem('token', token);
   localStorage.setItem('email', email);
  localStorage.setItem('username', token);
  }
  getToken() {
  return localStorage.getItem('token');
  }
  getUsername(){
    return localStorage.getItem('username');
  }
   getEmail() {
     return localStorage.getItem('email');
    }
  deleteToken() {
  localStorage.removeItem('token');
  localStorage.removeItem('email');
  localStorage.removeItem('username');
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

insertstudentprofiledetails(sp_name:any, sp_email:any, sp_dob:any, sp_designation:any, sp_company:any, sp_linkedin:any, sp_mobile: any, sp_address:any,sp_about:any){
  alert("insert student details invoked.");
  const formData: any = new FormData();
  formData.append("sp_name",sp_name);
  formData.append("sp_email",sp_email);
  formData.append("sp_dob",sp_dob);
  formData.append("sp_designation",sp_designation);
  formData.append("sp_company",sp_company);
  formData.append("sp_linkedin",sp_linkedin);
  formData.append("sp_mobile",sp_mobile);
  formData.append("sp_address",sp_address);
  formData.append("sp_about",sp_about);
  // console.log("FormData Before sending HTTPRequest " +formData["c_name"]);
  return this.httpClient.post<any>(this.baseUrl + '/profilebasic.php', formData)
    .pipe(
      catchError((error: any) => {
        console.error('Error occurred: ', error);
        //console.log(profile_pic);
        //console.log(formData);
        return throwError(error);
      }),
      map((response: any) => {
        console.log('Response received: ', response);
        //alert(response);
        return response;
      })
    ); 
}

updateminiprofile(profile_pic_file:any){
  const formData: any = new FormData();
  
  console.log(profile_pic_file.value.profile_pic);
  formData.append("profile_pic_file",profile_pic_file.value.profile_pic);
  //formData.append("email","nikhilphadke38@gmail.com");
  formData.append("email",this.getEmail());
  //console.log(formData.data);
return this.httpClient.post<any>(this.baseUrl + '/updateuserprofilepicture.php', formData)
.pipe(
  catchError((error: any) => {
    console.error('Error occurred: ', error);
    return throwError(error);
  }),
  map((response: any) => {
    console.log('Response received: ', response);
    return response;
  })
);
}

getStudentProfileImage(){
  const formData: any = new FormData();
  formData.append("email",this.getEmail());
  return this.httpClient.post<any>(this.baseUrl + '/updateuserprofilepicture.php', formData)
.pipe(
  catchError((error: any) => {
    console.error('Error occurred: ', error);
    return throwError(error);
  }),
  map((response: any) => {
    console.log('Response received: ', response);
    return response;
  })
); 
}

//this is for getting details from db in editprofile page
getStudentProfileDetails(){
  const formData: any = new FormData();
  formData.append("email",this.getEmail());
  return this.httpClient.post<any>(this.baseUrl + '/completeStudentProfile.php', formData)
.pipe(
  catchError((error: any) => {
    console.error('Error occurred: ', error);
    return throwError(error);
  }),
  map((response: any) => {
    console.log('Response received: ', response);
    return response;
  })
); 
}

getTestimonials(){
  return this.httpClient.get<Users[]>(this.baseUrl+'/getTestimonials.php');
}

}
