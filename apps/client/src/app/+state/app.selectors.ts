import { createFeatureSelector, createSelector } from '@ngrx/store';
import { APP_FEATURE_KEY, AppState } from './app.reducer';

// Lookup the 'App' feature state managed by NgRx
export const selectAppState = createFeatureSelector<AppState>(APP_FEATURE_KEY);

export const selectAppLoaded = createSelector(
  selectAppState,
  (state: AppState) => state.loaded
);

export const selectAppError = createSelector(
  selectAppState,
  (state: AppState) => state.error
);

export const selectAllApp = createSelector(
  selectAppState,
  (state: AppState) => state
);
