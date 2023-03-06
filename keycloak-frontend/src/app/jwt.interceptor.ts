import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { catchError, finalize, Observable, tap, throwError } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  public message: HttpErrorResponse | undefined;
  constructor(
    private keycloak: KeycloakService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // add authorization header with jwt token if available
    let token =this.keycloak.getToken();
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    } else {
    //  this.authService.redirectToLogin();
    }
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 || error.status === 403) {
         // this.tokenStorageService.signOut();
         // this.authService.redirectToLogin();
         console.log("implement logout redirection");
        }
        return throwError(() => error);
      })
    );
  }
}
