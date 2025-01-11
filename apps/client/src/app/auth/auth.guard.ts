import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable, of, switchMap, take } from 'rxjs';
import { SsrCookieService } from 'ngx-cookie-service-ssr';
import { AppFacade } from '../+state/app.facade';
import { isPlatformBrowser } from '@angular/common';
import { decodeJWTToken } from '../shared';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  private readonly platformId: Object = inject(PLATFORM_ID);
  private readonly facade = inject(AppFacade);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  canActivate(): Observable<boolean> {
    if (isPlatformBrowser(this.platformId)) {
      // Check if the token is already in the state
      // If found, return true
      // Otherwise, check if the token is stored in the cookie
      // If found, store the token in the state and return true
      // Otherwise, navigate to welcome and return false
      return this.facade.authToken$.pipe(
        take(1),
        switchMap((token) => {
          if (!token) {
            console.error('No token found, redirecting to welcome');
            this.router.navigate(['/welcome']);
            return of(false);
          }
          const jwt = decodeJWTToken(token);
          // Check if the token is expired
          const now = Date.now() / 1000;
          if (jwt.exp === undefined || jwt.exp < now) {
            console.error('Token expired, redirecting to welcome');
            this.router.navigate(['/welcome']);
            return of(false);
          }

          return of(true);
        }),
      );
    }

    return of(false);
  }
}
