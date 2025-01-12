import { createFeatureSelector, createSelector } from '@ngrx/store';
import { APP_FEATURE_KEY, AppState } from './app.reducer';

// Lookup the 'App' feature state managed by NgRx
export const selectAppState = createFeatureSelector<AppState>(APP_FEATURE_KEY);

export const selectAppLoaded = createSelector(
  selectAppState,
  (state: AppState) => state.loaded,
);

export const selectAppError = createSelector(
  selectAppState,
  (state: AppState) => state.error,
);

export const selectAllApp = createSelector(
  selectAppState,
  (state: AppState) => state,
);

export const selectApiBaseUrl = createSelector(
  selectAppState,
  (state: AppState) => state.apiBaseUrl,
);

export const selectAuthToken = createSelector(
  selectAppState,
  (state: AppState) => state.token,
);

export const selectDecodedToken = createSelector(selectAuthToken, (token) =>
  token ? decodeJWTToken(token) : null,
);

export const selectTokenExpiry = createSelector(selectDecodedToken, (token) =>
  token ? token.exp : null,
);

export const selectTokenExpired = createSelector(selectTokenExpiry, (expiry) =>
  expiry ? expiry * 1000 < Date.now() : true,
);

function decodeJWTToken(token: string) {
  return JSON.parse(atob(token.split('.')[1]));
}

export const selectProfile = createSelector(
  selectAppState,
  (state: AppState) => state.profile,
);
