import { isPlatformBrowser } from '@angular/common';
import {
  afterNextRender,
  Component,
  inject,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
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
    this.route.queryParams.subscribe((params) => {
      const token = params['access_token'];
      if (token) {
        this.facade.authenticated(token);
        if (isPlatformBrowser(this.platformId)) {
          // Get the token from the URL the Angular way
          console.log('Authenticated!');
          if (window.close) window.close();
        }
      } else {
        console.error('No token found in the URL');
      }
    });
  }
}
