import { Component } from '@angular/core';
import { faBars,faCoffee } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  faBars = faBars;
  faCoffee = faCoffee;

  navBarVisible = false;

  handleClick(){
    this.navBarVisible = !this.navBarVisible
  }
}
