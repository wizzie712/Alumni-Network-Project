import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit{

  loginForm = new FormGroup({
    logemail: new FormControl("", [
      Validators.required,
      Validators.email]),
    logpassword: new FormControl("", [
      Validators.required,
      Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{7,}')])
});

  [logemail: string]: any;
  constructor(private alertController: AlertController, private router: Router) { }

  ngOnInit(): void {
  }


get Email(): FormControl {
  return this.loginForm.get("logemail") as FormControl;
}

get Password(): FormControl {
  return this.loginForm.get("logpassword") as FormControl;
}

  async loginSubmitted(){
  if (
    this.loginForm.valid &&
    this.Email.value === 'anushka.salvi@spit.ac.in' &&
    this.Password.value === 'Abc@12345'
  ) {
    const alert = await this.alertController.create({
      header: 'Login Success',
      message: 'You have successfully logged in.',
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.router.navigate(['/crudlist']); // Replace '/new-page' with the actual route to the new page
          }
        }
      ],
      cssClass: 'alert-middle' // Add the CSS class to center the alert
    });

    await alert.present();
  } else {
    const alert = await this.alertController.create({
      header: 'Login Failed',
      message: 'Invalid email or password.',
      buttons: ['OK'],
      cssClass: 'alert-middle' // Add the CSS class to center the alert
    });

    await alert.present();
  }

}
}


