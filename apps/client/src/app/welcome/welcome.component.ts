import {
  Component,
  effect,
  inject,
  OnInit,
  PLATFORM_ID,
  signal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
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
export class WelcomeComponent implements OnInit {
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

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      // this.authToken$.subscribe((token) => {
      //   console.log('token change detected on welcome: ', token);
      //   if (token) this.router.navigate(['/dashboard']);
      // });
    }
  }

  signUpWithGoogle(): void {
    this.facade.apiBaseUrl$.subscribe((apiBaseUrl) => {
      const pxy = open(
        apiBaseUrl + '/api/v1/auth/google',
        '_blank',
        'popup=true,width=500,height=600',
      );

      pxy?.addEventListener('message', (event) => {
        if (event.origin !== window.location.origin || !event.data?.token)
          return;
        console.log('event: ', event);
        this.facade.authenticated(event.data.token);
      });
    });
  }
}
