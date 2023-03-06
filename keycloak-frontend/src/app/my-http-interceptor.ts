import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpXsrfTokenExtractor,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class MyHttpInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private tokenExtractor: HttpXsrfTokenExtractor
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Add an header to prevent auth popup in browser

    let customReq;
    if (this.tokenExtractor.getToken()) {
      const token = this.tokenExtractor.getToken() as string;
      customReq = req.clone({
        headers: req.headers
          .set('X-Requested-With', 'XMLHttpRequest')
          .set('withCredentials', 'true')
          .set('X-XSRF-TOKEN', token),
      });
    } else {
      customReq = req.clone({
        headers: req.headers
          .set('X-Requested-With', 'XMLHttpRequest')
          .set('withCredentials', 'true'),
      });
    }

    return next.handle(customReq);
  }
}
