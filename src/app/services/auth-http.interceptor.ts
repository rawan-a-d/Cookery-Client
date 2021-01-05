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

@Injectable()
export class AuthHttpInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');
    let isLoggedIn = token != null;
    let contentType;

    // request = request.clone({
    //   setHeaders: {
    //     'Authorization': `Bearer ${token}`,
    //     'Content-Type': 'application/json'
    //   }
    // });

    let headers = request.headers;


    if (headers.has('Content-Type')) {
      contentType = headers.get('Content-Type');
    }

    console.log("content " + contentType)

    // request = request.clone({
    //   setHeaders: {
    //     'Authorization': `Bearer ${this.auth.getToken()}`,
    //     'Content-Type': (contentType != 'application/json' ? 'application/text' :  contentType)
    //   }
    // });

                        //.set('Content-Type', 'application/json')
                    // .set('Authorization', `Bearer ${sessionStorage.getItem('authToken')}`);


    if(isLoggedIn) {
      // request = request.clone({
      //   setHeaders: {
      //     // 'Content-Type': (contentType == undefined ? 'application/json' :  undefined),
      //     Authorization: `Bearer ${token}`
      //   }
      // });
      console.log("loggedIn")
      headers = headers.append('Authorization', `Bearer ${token}`);
    }
    else {
      // request = request.clone({
      //   setHeaders: {
      //     // 'Content-Type': (contentType == undefined ? 'application/json' :  undefined),
      //   }
      // });
      console.log("not loggedIn")

    }

    // if(contentType == 'multipart/form-data') {
    //   console.log('Content-Type ' + contentType + ' if')
    //   // headers = headers.delete('Content-Type');
    // }
    // else {
    //   console.log('Content-Type ' + contentType + ' else')

    //   headers = headers.append('Content-Type', 'application/json');

    // }

    contentType == undefined ? 
        (headers = headers.append('Content-Type', 'application/json')) : 
        (headers = headers.delete('Content-Type'));

    console.log(headers.get('Content-Type'))
    console.log('Authorization ' + headers.get('Authorization'))

    // npm install angular2-jwt

            // remove name
            // cont body = {password: req.body.password }
    // const reqCopy = req.clone({
    //     body
    // })
    // // modfiy name to "chidume"
    // cont body = {...req.body, "name": "chidume"}
    // const reqCopy = req.clone({
    //     body
    // })


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

    const clonedRequest = request.clone({headers});

    return next.handle(clonedRequest);
    
    
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