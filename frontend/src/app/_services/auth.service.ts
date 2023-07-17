import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';



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
  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + 'login', {
      email,
      password
    }, httpOptions);
  }

  register(firstName: string, email: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + 'signup', {
      firstName,
      email,
      password
    }, httpOptions);
  }
}

