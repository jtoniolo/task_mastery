import { Injectable, inject } from '@angular/core';
import { select, Store } from '@ngrx/store';

import * as AppActions from './app.actions';
import * as AppSelectors from './app.selectors';

@Injectable()
export class AppFacade {
  private readonly store = inject(Store);

  /**
   * Combine pieces of state using createSelector,
   * and expose them as observables through the facade.
   */
  loaded$ = this.store.pipe(select(AppSelectors.selectAppLoaded));
  allApp$ = this.store.pipe(select(AppSelectors.selectAllApp));
  authToken$ = this.store.pipe(select(AppSelectors.selectAuthToken));
  tokenExpired$ = this.store.pipe(select(AppSelectors.selectTokenExpired));
  apiBaseUrl$ = this.store.pipe(select(AppSelectors.selectApiBaseUrl));
  profile$ = this.store.pipe(select(AppSelectors.selectProfile));

  authenticated(token: string) {
    this.store.dispatch(AppActions.authenticated({ token }));
  }

  /**
   * Use the initialization action to perform one
   * or more tasks in your Effects.
   */
  init() {
    this.store.dispatch(AppActions.initApp());
  }

  dashboardOpen() {
    this.store.dispatch(AppActions.dashboardOpen());
  }
}
