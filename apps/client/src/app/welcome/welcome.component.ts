import { isPlatformBrowser, DOCUMENT } from '@angular/common';
import { Component, effect, inject, PLATFORM_ID } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { AppFacade } from '../+state/app.facade';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../+state/app.reducer';
import { selectAuthToken } from '../+state/app.selectors';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly store = inject(Store<AppState>);
  private readonly authToken$ = this.store.select(selectAuthToken);
  private readonly facade = inject(AppFacade);
  private readonly router = inject(Router);
  private readonly document = inject(DOCUMENT);
  readonly token = toSignal(this.store.select(selectAuthToken));
  readonly tokenExpired = toSignal(this.facade.tokenExpired$);

  refreshEffect = effect(() => {
    if (this.token() && this.tokenExpired()) {
      this.signUpWithGoogle();
    }
    if (this.token()) {
      this.router.navigate(['/dashboard']);
    }
  });

  signUpWithGoogle(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.facade.apiBaseUrl$.subscribe((apiBaseUrl) => {
        const pxy = open(
          apiBaseUrl + '/api/v1/auth/google',
          '_blank',
          'popup=true,width=500,height=600',
        );
        try {
          window.addEventListener('message', (event) => {
            console.log('event: ', event);
            if (event.origin !== window.location.origin || !event.data?.token) {
              console.error('Invalid origin or no token found');
              return;
            }
            this.facade.authenticated(event.data.token);
          });
        } catch (e) {
          console.error(e);
          debugger;
        }
      });
    }
  }
}
