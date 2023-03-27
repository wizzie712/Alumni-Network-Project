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
    public faculty_password:string;

    constructor(faculty_name: string,faculty_email:string,faculty_password:string) {
    this.faculty_name = faculty_name;
    this.faculty_email = faculty_email;
    this.faculty_password = faculty_password;
    }
    }
