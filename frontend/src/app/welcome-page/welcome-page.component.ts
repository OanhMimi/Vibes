import { Component } from '@angular/core';
import { faAngleDown, faBook, faPencil, faSeedling } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.css']
})
export class WelcomePageComponent {

  faAngleDown = faAngleDown;
  faBook = faBook;
  faPencil = faPencil;
  faSeedling = faSeedling;

}
