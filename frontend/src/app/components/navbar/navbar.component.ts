import { Component } from '@angular/core';
import { faBars, faHeart } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/shared/services/auth';
import { Router } from '@angular/router';



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})


export class NavbarComponent {
  faBars = faBars;
  navBarVisible = false;
  faHeart = faHeart;

  constructor(
    public authService: AuthService,
    private router: Router
  ){}

  redirectTo(){
    if (this.authService.isLoggedIn){
      this.router.navigate(['/dashboard'])
    } else {
      this.router.navigate(['/login'])
    }
  }

  handleClick(){
    this.navBarVisible = !this.navBarVisible;
  }
}
