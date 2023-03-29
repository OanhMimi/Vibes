import { Component } from '@angular/core';
import { faAngleDown, faBook, faPencil, faSeedling } from '@fortawesome/free-solid-svg-icons';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/all';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  faAngleDown = faAngleDown;
  faBook = faBook;
  faPencil = faPencil;
  faSeedling = faSeedling;
}
