export class Companydetails {
    public stud_name: string;
    public c_designation: string;
    public c_jobtype: string;
    public c_location: string;
    public c_experience: string;
    public c_salary: string;
    public c_suggestions: string;

     constructor( stud_name: string,c_designation:string, c_jobtype:string, c_location:string, c_experience:string,c_salary:string,c_suggestions:string) {
         this.stud_name = stud_name;
         this.c_designation = c_designation;
         this.c_jobtype = c_jobtype;
         this.c_location = c_location;
         this.c_experience = c_experience;
         this.c_salary = c_salary;
         this.c_suggestions = c_suggestions;

     }
 }