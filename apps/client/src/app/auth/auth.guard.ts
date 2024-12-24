import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable, of, switchMap, take } from 'rxjs';
import { SsrCookieService } from 'ngx-cookie-service-ssr';
import { AppFacade } from '../+state/app.facade';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  private readonly platformId: Object = inject(PLATFORM_ID);
  private readonly cookieServcice = inject(SsrCookieService);
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
          if (token) return of(true);
          const cookies = this.cookieServcice.getAll();
          console.log('Cookies:', cookies);
          const cookieToken = this.cookieServcice.get('access_token');
          if (cookieToken) {
            this.facade.authenticated(cookieToken);
            return of(true);
          }
          console.error('No token found, redirecting to welcome');
          this.router.navigate(['/welcome']);
          return of(false);
        }),
      );
    }

    return of(false);
  }
}
