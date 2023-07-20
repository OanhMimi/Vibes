import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';



const AUTH_API = 'http://localhost:3000/api/users/';
const token = localStorage.getItem('token');
const httpOptions = {
  headers: {
    'Content-Type':'application/json',
    'Authorization': 'Bearer' + token,
    'Accept': 'application/json'
  }
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: any;
  constructor(
    private http: HttpClient,
    public afs: AngularFirestore, // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    public ngZone: NgZone 
    ) { 

  /* Saving user data in localstorage when 
    logged in and setting up null when logged out */
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user')!);
      } else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
      }
    });
  }
}
 

