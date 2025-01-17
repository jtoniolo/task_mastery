import { isPlatformBrowser } from '@angular/common';
import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppFacade } from '../+state/app.facade';

@Component({
  selector: 'app-auth',
  template: ``,
  styles: ``,
})
export class AuthComponent implements OnInit {
  private readonly facade = inject(AppFacade);
  private readonly platformId: Object = inject(PLATFORM_ID);
  private readonly route = inject(ActivatedRoute);

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const origin = window.location.origin;
      this.route.queryParams.subscribe((params) => {
        const token = params['access_token'];
        if (token) {
          console.log('Authenticated!');
          // Post a message to the parent window (this is the popup), which is at the same origin
          // Don't try to mess with NgRx state here. It doens't work.
          try {
            this.facade.authenticated(token);
            window.opener.postMessage({ token }, origin);
          } catch (e) {
            alert(e);
            console.error(e);
            debugger;
          }

          if (window.close) window.close();
        } else {
          console.error('No token found in the URL');
        }
      });
    }
  }
}
