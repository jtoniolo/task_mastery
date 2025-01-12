import { inject, Injectable } from '@angular/core';
import { SsrCookieService } from 'ngx-cookie-service-ssr';
import { AppFacade } from '../+state/app.facade';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly cookieServcice = inject(SsrCookieService);
  private readonly facade = inject(AppFacade);

  constructor() {}
}
