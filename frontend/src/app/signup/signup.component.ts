import { AfterViewInit, Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { faAngleDown, faBook, faPencil, faSeedling } from '@fortawesome/free-solid-svg-icons';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { AuthService } from '../_services/auth.service';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../_services/user.service';
import { ElementRef} from '@angular/core';
import { fromEvent } from 'rxjs';
import { throttleTime } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})


export class SignupComponent implements OnInit, 
AfterViewInit {

    name = 'angular';
   title = 'angularhttp';
  
  constructor(
    private userService: UserService,
    private authService: AuthService
    ) {}

  @ViewChild('sunLayer') sunLayer! : ElementRef
  @ViewChild('rightMt4') rightMt4!: ElementRef
  @ViewChild('leftMt2') leftMt2!: ElementRef
  @ViewChild('bird1') bird1!: ElementRef
  @ViewChild('bird2') bird2!: ElementRef


  @HostListener('window:scroll')
  ngAfterViewInit() {
  fromEvent(window, 'scroll').pipe(
    throttleTime(100)
  ).subscribe(() => this.onWindowScroll())
}

  onWindowScroll() {
    const scrollPos = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;

    this.bird1.nativeElement.style.right = (0 + (scrollPos * 1)) + "px";

    if (scrollPos < 600) {
      this.sunLayer.nativeElement.style.top = -(scrollPos * 0.25) + "px";
      this.sunLayer.nativeElement.style.right = (scrollPos)+ "px";
      this.rightMt4.nativeElement.style.bottom = (0 - (scrollPos * 0.05)) + "px";
    }

    if (scrollPos > 600) {
      this.rightMt4.nativeElement.style.bottom = (0 - (scrollPos * 0.05)) + "px";
      this.leftMt2.nativeElement.style.bottom = (0 - (scrollPos * 0.08)) + "px";
    }

  }




  onGetUsers(): void {
    this.userService.getUsers().subscribe(
      (response: any) => console.log(response),
      (error: any) => console.log(error),
      () => console.log('Done getting users.')
      );
  }
  handleButtonClick(): void {
   this.onGetUsers();
  }

  form: any = {
    firstName: null,
    email: null,
    password: null,
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

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


