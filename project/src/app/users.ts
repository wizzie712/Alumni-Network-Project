export class Users {
    public stud_name: string;
    public stud_email:string;
    public stud_password:string;
    public stud_gender: string;
    public stud_batch: number;
    
    constructor(stud_name: string,stud_email:string,stud_password:string,stud_gender:string,stud_batch:number) {
    this.stud_name = stud_name;
    this.stud_email = stud_email;
    this.stud_password = stud_password;
    this.stud_gender = stud_gender;
    this.stud_batch = stud_batch;
    }
    }


export class Faculty{
    public faculty_name: string;
    public faculty_email: string;
    public faculty_dept: string;
    public faculty_qualification: string;
    public faculty_designation: string;
    public faculty_password:string;
    public faculty_aoi: string;

    constructor(faculty_name: string,faculty_email:string,faculty_dept: string,faculty_qualification: string,faculty_designation: string,faculty_password:string,faculty_aoi: string) {
    this.faculty_name = faculty_name;
    this.faculty_email = faculty_email;
    this.faculty_dept = faculty_dept;
    this.faculty_qualification =  faculty_qualification;
    this.faculty_designation = faculty_designation;
    this.faculty_password = faculty_password;
    this.faculty_aoi = faculty_aoi;
    }
    }

export class StudentProfile{
    public sp_name:string;
    public sp_email:string;
    public sp_dob:string;
    public sp_designation:string;
    public sp_company:string;
    public sp_linkedin:string;
    public sp_mobile:number;
    public sp_address:string;
    public sp_about:string;
    public sp_profile_image:string;

    constructor(sp_name:string,sp_email:string,sp_dob:string,sp_designation:string,sp_company:string,sp_linkedin:string,sp_mobile:number,sp_address:string,sp_about:string,sp_profile_image:string){
        this.sp_name = sp_name;
        this.sp_email = sp_email;
        this.sp_dob = sp_dob;
        this.sp_designation = sp_designation;
        this.sp_company = sp_company;
        this.sp_linkedin = sp_linkedin;
        this.sp_mobile = sp_mobile;
        this.sp_address = sp_address;
        this.sp_about = sp_about;
        this.sp_profile_image = sp_profile_image;
    }
}
