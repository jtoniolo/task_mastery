import { createReducer, on, Action } from '@ngrx/store';

import * as AppActions from './app.actions';
import { AppEntity } from './app.models';

export const APP_FEATURE_KEY = 'app';

export interface AppState extends AppEntity {
  loaded: boolean; // has the App list been loaded
  error?: string | null; // last none error (if any)
}

export interface AppPartialState {
  readonly [APP_FEATURE_KEY]: AppState;
}

export const initialAppState: AppState = {
  apiBaseUrl: '',
  title: 'Email Sweeperr',
} as AppState;

const reducer = createReducer(
  initialAppState,
  on(AppActions.initApp, (state) => ({ ...state, loaded: false, error: null })),
  on(AppActions.loadAppSuccess, (state, { app }) => ({
    ...state,
    apiBaseUrl: app.apiBaseUrl || state.apiBaseUrl,
    title: app.title || state.title,
    loaded: true,
  })),
  on(AppActions.loadAppFailure, (state, { error }) => ({ ...state, error })),
  on(AppActions.authenticated, (state, { token }) => ({ ...state, token })),
  on(AppActions.loadProfileSuccess, (state, { profile }) => ({
    ...state,
    profile,
  })),
);

export function appReducer(state: AppState | undefined, action: Action) {
  return reducer(state, action);
}
