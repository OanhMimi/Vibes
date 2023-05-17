import { HTTP_INTERCEPTORS, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';

import { TokenStorageService } from '../_services/token-storage.service';
import { Observable } from 'rxjs';

const TOKEN_HEADER_KEY = 'Authorization';       // for Spring Boot back-end

@Injectable()
export class CsrfInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // Get CSRF token from cookie
    const csrfToken = this.getCookie('csrfToken');

    // Clone the request and set the CSRF token in the header
  let authReq = req;
  if (csrfToken) {
    authReq = req.clone({
      headers: req.headers.set('X-CSRF-Token', csrfToken)
    });
}


    // Pass the cloned request to the next handler in the chain
    return next.handle(authReq);
  }

  private getCookie(name: string) {
    // Get cookie value by name
    const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');

    // Return cookie value or empty string
    return cookieValue ? cookieValue.pop() : '';
  }
}

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private token: TokenStorageService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authReq = req;
    const token = this.token.getToken();
    if (token != null) {
      authReq = req.clone({ headers: req.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token) });
    }
    return next.handle(authReq);
  }
}

export const authInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
   { provide: HTTP_INTERCEPTORS, useClass: CsrfInterceptor, multi: true },
];