import { Component,OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})


export class SignupComponent implements OnInit {
  userForm: FormGroup;

  constructor(
    public authService: AuthService,
    ) {}

  ngOnInit(): void {
    this.userForm = new FormGroup({
        displayName: new FormControl(''),
        email: new FormControl(''),
        password: new FormControl('', [Validators.required]),
        passwordConfirm: new FormControl('', [Validators.required])
    }, { validators: this.checkPasswords });
  }

  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
    let pass = group.get('password').value;
    let confirmPass = group.get('passwordConfirm').value;

    return pass === confirmPass ? null : { notSame: true }
  }
   
  }



