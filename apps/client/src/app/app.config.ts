import {
  ApplicationConfig,
  provideZoneChangeDetection,
  isDevMode,
  inject,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideStore, provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideServiceWorker } from '@angular/service-worker';
import * as fromApp from './+state/app.reducer';
import { AppEffects } from './+state/app.effects';
import { AppFacade } from './+state/app.facade';
import { BASE_PATH } from './proxy';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { SsrCookieService } from 'ngx-cookie-service-ssr';
import { AppConfigService } from './config/app-config.service';
import { map, Observable, of } from 'rxjs';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withFetch()),
    provideEffects(AppEffects),
    provideState(fromApp.APP_FEATURE_KEY, fromApp.appReducer),
    AppFacade,
    { provide: BASE_PATH, useFactory: apiBaseUrl },
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideAnimationsAsync(),
    provideStore(),
    provideEffects(),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000',
    }),
    SsrCookieService,
  ],
};

export function apiBaseUrl(): Observable<string> {
  const service = inject(AppConfigService);
  return service.init().pipe(
    map((config) => {
      return config.apiBaseUrl;
    }),
  );
}
