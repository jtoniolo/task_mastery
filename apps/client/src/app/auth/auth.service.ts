import { afterNextRender, inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { SsrCookieService } from 'ngx-cookie-service-ssr';
import { AppFacade } from '../+state/app.facade';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly cookieServcice = inject(SsrCookieService);
  private readonly facade = inject(AppFacade);
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);
  private token: string = '';

  constructor() {}

  isAuthenticated(): boolean {
    // Check if the token is already stored in the service
    if (this.token) return true;

    // Check if the token is stored in the cookie
    const token = this.cookieServcice.get('auth_token');
    if (token) {
      this.facade.authenticated(token);
      this.token = token;
    }

    return !!this.token;
  }
}
