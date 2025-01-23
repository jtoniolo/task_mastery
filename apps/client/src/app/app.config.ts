// Angular imports
import {
  ApplicationConfig,
  provideZoneChangeDetection,
  isDevMode,
  inject,
  importProvidersFrom,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import {
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideServiceWorker } from '@angular/service-worker';
import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withFetch,
  withInterceptorsFromDi,
} from '@angular/common/http';

// 3rd party imports
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
import {
  provideStore,
  provideState,
  ActionReducer,
  MetaReducer,
} from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { SsrCookieService } from 'ngx-cookie-service-ssr';
import { localStorageSync } from 'ngrx-store-localstorage';

// Local imports
import { routes } from './app.routes';
import { ApiModule, BASE_PATH } from './proxy';
import { AppConfigService } from './config/app-config.service';
import { AuthInterceptor } from './auth/auth.interceptor';
import {
  appReducer,
  APP_FEATURE_KEY,
  AppEffects,
  AppFacade,
  dashboardFeature,
  DashboardEffects,
} from './+state';
import { GmailFacade } from './+state/gmail/gmail.facade';
import { GmailEffects } from './+state/gmail/gmail.effects';
import { gmailFeature } from './+state/gmail/gmail.reducer';

export function localStorageSyncReducer(
  reducer: ActionReducer<any>,
): ActionReducer<any> {
  return localStorageSync({
    keys: [APP_FEATURE_KEY],
    rehydrate: true,
    checkStorageAvailability: true,
  })(reducer);
}
const metaReducers: Array<MetaReducer<any, any>> = [localStorageSyncReducer];

export const appConfig: ApplicationConfig = {
  providers: [
    AppConfigService,
    provideCharts(withDefaultRegisterables()),
    provideHttpClient(withFetch(), withInterceptorsFromDi()),
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    provideEffects([AppEffects, DashboardEffects, GmailEffects]),
    provideState(APP_FEATURE_KEY, appReducer),
    provideState(dashboardFeature),
    provideState(gmailFeature),
    AppFacade,
    GmailFacade,
    { provide: BASE_PATH, useFactory: apiBaseUrl, deps: [AppConfigService] },
    importProvidersFrom(ApiModule),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideAnimationsAsync(),
    provideStore({}, { metaReducers }),
    provideEffects(),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000',
    }),
    SsrCookieService,
  ],
};

export function apiBaseUrl(): string {
  const service = inject(AppConfigService);
  return service.config.apiBaseUrl;
}
