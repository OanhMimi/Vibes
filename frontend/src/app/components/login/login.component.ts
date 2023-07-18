import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    constructor(
      public authService: AuthService
    ) {}

  form: any = {
    firstName: null,
    email: null,
    password: null,
  };
  isSuccessful = false;
  isLoginFailed = false;
  errorMessage = '';

  ngOnInit(): void {
  }

  // onSubmit(): void {
  //   const { email, password } = this.form;

  //   this.authService.login( email, password).subscribe({
  //     next: data => {
  //       console.log(data);
  //       this.isSuccessful = true;
  //       this.isLoginFailed = false;
  //     },
  //     error: err => {
  //       this.errorMessage = err.error.message;
  //       this.isLoginFailed = true;
  //     }
  //   });
  // }
}
