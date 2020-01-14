import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import {TokenStorage} from '../../services/auth/token.storage';

@Injectable()
export class AppInterceptor implements HttpInterceptor {
  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const token = new TokenStorage();
    const tokenVal = token.getToken();
    const clonedRequest = req.clone({
      headers: req
        .headers
        .set('Authorization', tokenVal ? `Bearer ${tokenVal}` : '')
    });

    // console.log(`Request for ${req.urlWithParams} started...`);

    return next.handle(clonedRequest).pipe(map((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        // console.log(`Request for ${req.urlWithParams} completed...`);
      }
      return event;
    }),
      catchError((error: HttpErrorResponse) => {
        const started = Date.now();
        const elapsed = Date.now() - started;
        console.log(`Request for ${req.urlWithParams} failed after ${elapsed} ms.`);
        // debugger;
        return throwError(error);
      })
    );

  }
}