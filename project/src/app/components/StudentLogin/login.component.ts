import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, NgForm, FormBuilder } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component2.css']
})
export class LoginComponent implements OnInit {
  [x: string]: any;
  angForm: FormGroup;
  constructor(private alertController: AlertController, private fb: FormBuilder,private dataService: ApiService,private router:Router) {
  this.angForm = this.fb.group({
    stud_email: ['', [Validators.required,Validators.minLength(1), Validators.email, this.gmailValidator]],
    stud_password: ['', Validators.required]
    });
    }

    gmailValidator(control: FormControl) {
      const email = control.value;
      if (email && !email.endsWith('@gmail.com')) {
        return { invalidGmail: true };
      }
      return null;
    }
  ngOnInit() {
  }
  postdata(angForm1: { value: { stud_email: any; stud_password: any; }; })
  {
  this.dataService.userlogin(angForm1.value.stud_email,angForm1.value.stud_password)
  .pipe(first())
  .subscribe(
    async (data) => {
      const alert = await this.alertController.create({
        header: 'Login Success',
        message: 'You have successfully logged in.',
        buttons: [
          {
            text: 'OK',
            handler: () => {
              this.router.navigate(['/studentdashboard']);
            },
          },
        ],
        cssClass: 'alert-middle',
      });

      await alert.present();
    },
    async (error) => {
      const alert = await this.alertController.create({
        header: 'Login Failed',
        message: 'Invalid email or password.',
        buttons: ['OK'],
        cssClass: 'alert-middle',
      });

      await alert.present();
    }
  );
}
  get Email() { return this.angForm.get('stud_email') as FormControl; }
  get Password() { return this.angForm.get('stud_password') as FormControl; }
  }
