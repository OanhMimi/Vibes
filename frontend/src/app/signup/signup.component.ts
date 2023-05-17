import { Component, OnInit } from '@angular/core';
import { faAngleDown, faBook, faPencil, faSeedling } from '@fortawesome/free-solid-svg-icons';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit {
  form: any = {
    firstName: null,
    email: null,
    password: null
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    const { firstName, email, password } = this.form;
    console.log("first")

    this.authService.register(firstName, email, password).subscribe({
      next: data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    });
     console.log("after service")
  }

  faAngleDown = faAngleDown;
  faBook = faBook;
  faPencil = faPencil;
  faSeedling = faSeedling;
}

