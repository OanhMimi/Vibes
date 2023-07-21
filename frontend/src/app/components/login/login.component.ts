import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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

    loginForm = new FormGroup({
      email: new FormControl(''),
      password: new FormControl('')
    })

  ngOnInit(): void {
  }
}
