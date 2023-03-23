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