import { Injectable, Injector } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { ErrorService } from './errors/error.service';
import { NotificationService } from './errors/notification.service';
import { AuthService } from './auth.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
	constructor(private injector: Injector,
    private router: Router,
    private authService: AuthService) { }


  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          const errorService = this.injector.get(ErrorService); // gets the error message
          const notifier = this.injector.get(NotificationService); // show a pop up on screen
          // Check type of error
          if (error instanceof HttpErrorResponse) { // Server or connection error happened
            console.log("ERROR " + error.status);
            if (!navigator.onLine) {
              console.log("offline")
              // Handle offline error
              this.router.navigate(['offline']);
            } 
            else {
              console.log("server error")
              
              if(error.status == 401) { // Unauthorized
                if(error.error.indexOf("Token has expired")) {
                  console.log("Token expried " + error.error);
                  
                  this.authService.logout();
                }

                this.router.navigate(['login']);
              }
  
              else if(error.status == 403) { // Forbidden
                this.router.navigate(['forbidden']);
              }
  
              else if (error.status == 404) { // Not found
                this.router.navigate(['not-found']);
              }
    
              else if(error.status == 500) { // Internal server error
                this.router.navigate(['internal-server-error']);
              }
              else if(error.status == 0) { // Unexpected error (Server is down)
                this.router.navigate(['unexpected-error']);
              }
              else { // other
                let message = errorService.getServerMessage(error);
                notifier.showError(message);
              }
            }
          }
          else { // Handle Client Error (Angular Error, ReferenceError...)     
            console.log("client error")
  
            let message = errorService.getClientMessage(error);
            notifier.showError(message);
          }
  
          return throwError(error.message);
        }
      )
    )
  }
}
