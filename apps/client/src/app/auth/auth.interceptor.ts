import { inject, Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { catchError, mergeMap, Observable } from 'rxjs';
import { AppFacade } from '../+state/app.facade';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private readonly router = inject(Router);
  private readonly facade = inject(AppFacade);
  private readonly token$ = this.facade.authToken$;
  private readonly apiBaseUrl$ = this.facade.apiBaseUrl$;

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    console.log('Intercepting request', request.url);
    if (request.url === 'config.json') {
      console.log('Skipping token for request', request.url);
      return next.handle(request);
    }

    return this.token$.pipe(
      mergeMap((token) => {
        if (token) {
          console.log('Adding token to request', request.url);
          request = request.clone({
            setHeaders: {
              Authorization: `Bearer ${token}`,
            },
          });
        } else {
          console.log('No token found for request', request.url);
        }
        console.log('request', request);
        return next.handle(request).pipe(
          catchError((error) => {
            console.error('Error in request', request.url, error);
            if (error.status === 401) {
              console.error('Unauthorized, redirecting to login');
              this.router.navigate(['/welcome']);
            }
            return next.handle(request);
          }),
        );
      }),
    );
  }
}
