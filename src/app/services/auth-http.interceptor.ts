import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from "rxjs/operators";

// import 'rxjs/add/operator/do';

@Injectable()
export class AuthHttpInterceptor implements HttpInterceptor {
  // requestCounter: number = 0;

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');
    
    request = request.clone({
      // responseType: 'json',
      setHeaders: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
        // Authorization: `Basic ${token}`
      }
    });

    // npm install angular2-jwt



    // return next.handle(request)
    // .do((event: HttpEvent<any>) => {
    //   if (event instanceof HttpResponse) {
    //     // do stuff with response if you want
    //   }
    // }, (err: any) => {
    //   if (err instanceof HttpErrorResponse) {
    //     // do stuff with response error if you want
    //   }
    // });

    return next.handle(request);
    
    
    // return next.handle(request).pipe(
    //   tap(
    //     (event: HttpEvent<any>) => {
    //       if (event instanceof HttpResponse) {
    //         // do stuff with response if you want
    //       }
    //     },
    //     error => {
    //       if (error instanceof HttpErrorResponse) {
    //         if (error.status === 401) {
    //           // redirect to the login route
    //           // or show a modal
    //         }
    //       }
    //     }
    //   ),
    // );
   }
}
