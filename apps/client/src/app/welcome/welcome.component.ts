import { Component, inject, OnInit, signal } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { AppFacade } from '../+state/app.facade';
import { Router } from '@angular/router';
import { on } from 'events';
import { Store } from '@ngrx/store';
import { AppState } from '../+state/app.reducer';
import { selectAuthToken } from '../+state/app.selectors';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent implements OnInit {
  private readonly store = inject(Store<AppState>);
  private readonly authToken$ = this.store.select(selectAuthToken);
  private readonly facade = inject(AppFacade);
  private readonly router = inject(Router);
  private readonly document = inject(DOCUMENT);
  ngOnInit(): void {
    this.authToken$.subscribe((token) => {
      console.log('token change detected on welcome: ', token);
      if (token) this.router.navigate(['/dashboard']);
    });
  }
  signUpWithGoogle(): void {
    this.facade.apiBaseUrl$.subscribe((apiBaseUrl) => {
      this.document.open(
        apiBaseUrl + '/api/v1/auth/google',
        'Authenticate with Google',
        'width=500,height=600',
      );
    });
  }
  callback(response: any): void {
    console.log('response: ', response);
    const responsePayload = this.decodeJWTToken(response.credential);
    console.log(responsePayload);
  }
  private decodeJWTToken(token: string) {
    return JSON.parse(atob(token.split('.')[1]));
  }
}
