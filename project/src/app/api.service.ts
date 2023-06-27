import { Injectable, Output, EventEmitter } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Faculty, Users } from './users';
import { throwError } from 'rxjs';
import { Companydetails } from './companydetails';
import { getLocaleDateFormat } from '@angular/common';

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
  console.log(this.baseUrl+'/singlefaculty.php?fp_email='+faculty_email);
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

editFaculty(faculty_name: any,fp_email: any,fp_dept: any,fp_designation: any,fp_linkedin: any,fp_aoi: any) {
    //console.log(id);
    return this.httpClient.put(this.baseUrl+'/updatefaculty.php', {faculty_name, fp_email, fp_dept, fp_designation, fp_linkedin, fp_aoi});
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
getSbatches() {
  return this.httpClient.get<Users[]>(this.baseUrl+'/viewbatches.php');
}

insertstudentprofiledetails(sp_name:any, sp_email:any, sp_dob:any, sp_location:any, sp_designation:any, sp_company:any, sp_linkedin:any, sp_mobile: any){
  //alert("insert student details invoked.");
  const formData: any = new FormData();
  formData.append("sp_name",sp_name);
  formData.append("sp_email",sp_email);
  formData.append("sp_dob",sp_dob);
  formData.append("sp_location",sp_location);
  formData.append("sp_designation",sp_designation);
  formData.append("sp_company",sp_company);
  formData.append("sp_linkedin",sp_linkedin);
  formData.append("sp_mobile",sp_mobile);
  // console.log("FormData Before sending HTTPRequest " +formData["c_name"]);
  return this.httpClient.post<any>(this.baseUrl + '/profilebasic.php', formData)
    .pipe(
      catchError((error: any) => {
        console.error('Error occurred: ', error);
        //console.log(profile_pic);
        console.log(formData);
        return throwError(error);
      }),
      map((response: any) => {
        console.log('Response received: ', response);
        //alert(response);
        return response;
      })
    );
}

insertfacultyprofiledetails(faculty_name:any,fp_email: any, fp_mobile: any, fp_dob: any, fp_aoi: any, fp_linkedin: any, fp_designation: any, fp_dept: any) {
  const formData: any = new FormData();
  formData.append("faculty_name", faculty_name);
  formData.append("fp_email", fp_email);
  formData.append("fp_mobile", fp_mobile);
  formData.append("fp_dob", fp_dob);
  formData.append("fp_aoi", fp_aoi);
  formData.append("fp_linkedin", fp_linkedin);
  formData.append("fp_designation", fp_designation);
  formData.append("fp_dept", fp_dept);
  console.log(formData);
  return this.httpClient.post<any>(this.baseUrl + '/facultyprofilebasic.php', formData).pipe(
    catchError((error: any) => {
      console.error('Error occurred: ', error);
      return throwError('An error occurred while inserting faculty profile details.');
    }),
    map((response: any) => {
      console.log('Response received: ', response);
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

updateminiprofilefaculty(profile_pic_file:any){
  const formData: any = new FormData();

  console.log(profile_pic_file.value.profile_pic);
  formData.append("profile_pic_file",profile_pic_file.value.profile_pic);
  //formData.append("email","nikhilphadke38@gmail.com");
  formData.append("email",this.getEmail());
  //console.log(formData.data);
return this.httpClient.post<any>(this.baseUrl + '/updatefacultyprofilepicture.php', formData)
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

getFacultyProfileImage(){
  const formData: any = new FormData();
  formData.append("email",this.getEmail());
  return this.httpClient.post<any>(this.baseUrl + '/updatefacultyprofilepicture.php', formData)
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

//this is for getting details from db in editprofile page
getFacultyProfileDetails(){
  const formData: any = new FormData();
  formData.append("email",this.getEmail());
  return this.httpClient.post<any>(this.baseUrl + '/completeFacultyProfile.php', formData)
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
getStudentDetails() {
  const formData: any = new FormData();
  formData.append("email",this.getEmail());

  return this.httpClient.post<any>(this.baseUrl + '/retrieveStudentData.php', formData)
    .pipe(
      catchError((error: any) => {
        console.error('Error occurred: ', error);
        throw new Error('An error occurred while retrieving student details.'); // Throw a custom error
      }),
      map((response: any) => {
        if (response.success === 'success' && response.data) {
          response.data.forEach((student: any) => {
            const studName = student.stud_name;
            const designation = student.sp_designation;
            const profileImage = student.sp_profile_image;
            const linkedIn = student.sp_linkedin;

            // Display the data in whatever format you desire
            console.log(`Student Name: ${studName}`);
            console.log(`Designation: ${designation}`);
            console.log(`Profile Image: ${profileImage}`);
            console.log(`Linked In : ${linkedIn}`)
          });
        } else {
          console.log(response.message || 'No results found');
        }

        return response;
      })
    );
}

getFacultyDetails() {
  const formData: any = new FormData();
  formData.append("email",this.getEmail());

  return this.httpClient.post<any>(this.baseUrl + '/retrieveFacultyData.php', formData)
    .pipe(
      catchError((error: any) => {
        console.error('Error occurred: ', error);
        throw new Error('An error occurred while retrieving student details.'); // Throw a custom error
      }),
      map((response: any) => {
        if (response.success === 'success' && response.data) {
          response.data.forEach((faculty: any) => {
            const facultyName = faculty.faculty_name;
            const designation = faculty.fp_designation;
            const profileImage = faculty.fp_profile_image;
            const linkedIn = faculty.fp_linkedin;

            // Display the data in whatever format you desire
            console.log(`Faculty Name: ${facultyName}`);
            console.log(`Designation: ${designation}`);
            console.log(`Profile Image: ${profileImage}`);
            console.log(`Linked In : ${linkedIn}`)
          });
        } else {
          console.log(response.message || 'No results found');
        }

        return response;
      })
    );
}


getTestimonials(){
  return this.httpClient.get<Users[]>(this.baseUrl+'/getTestimonials.php');
}

// insertTestimonials(sp_email:any,stud_testimonial:any,stud_date:any){
//   const formData:any = new FormData();
//   formData.append("s_email",sp_email);
//   formData.append("stud_testimonial",stud_testimonial);
//   formData.append("stud_date",stud_date);
//   return this.httpClient.post<any>(this.baseUrl + '/addTestimonials.php', formData)
//     .pipe(
//       catchError((error: any) => {
//         console.error('Error occurred: ', error);
//         return throwError(error);
//       }),
//       map((response: any) => {
//         console.log('Response received: ', response);
//         //alert(response);
//         return response;
//       })
//     );
// }
insertTestimonials(stud_testimonial: any) {
  const currentDate: Date = new Date();

// Extract individual components of the date
const year: number = currentDate.getFullYear();
const month: number = currentDate.getMonth() + 1; // Note: Months are zero-based
const day: number = currentDate.getDate();

// Create a formatted date string
const formattedDate: string = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;

console.log(formattedDate); // Output: "2023-05-31"
  const formData: any = new FormData();
  formData.append("stud_email", this.getEmail());
  formData.append("stud_testimonial", stud_testimonial);
  formData.append("stud_date", formattedDate);
  console.log(this.getEmail());
  console.log('stud_testimonial:', stud_testimonial); // Log the stud_testimonial value
  console.log('stud_date:',formattedDate); // Log the stud_date value
  return this.httpClient.post<any>(this.baseUrl+'/addTestimonials.php', formData)
    .pipe(
      catchError((error: any) => {
        console.error('Error occurred:', error);
        return throwError(error);
      }),
      map((response: any) => {
        console.log('Response received:', response); // Log the response received from the server
        return response;
      })
    );
}

}
