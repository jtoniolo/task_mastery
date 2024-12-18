import { Action } from '@ngrx/store';

import * as AppActions from './app.actions';
import { AppEntity } from './app.models';
import { AppState, initialAppState, appReducer } from './app.reducer';

describe('App Reducer', () => {
  describe('valid App actions', () => {
    it('initApp should set loaded to false and clear error', () => {
      const action = AppActions.initApp();
      const result: AppState = appReducer(initialAppState, action);

      expect(result.loaded).toBe(false);
      expect(result.error).toBeNull();
    });

    it('loadAppSuccess should set loaded to true and update title', () => {
      const app = { title: 'New Title' };
      const action = AppActions.loadAppSuccess({ app });
      const result: AppState = appReducer(initialAppState, action);

      expect(result.loaded).toBe(true);
      expect(result.title).toBe(app.title);
    });

    it('loadAppFailure should set error', () => {
      const error = 'Error loading app';
      const action = AppActions.loadAppFailure({ error });
      const result: AppState = appReducer(initialAppState, action);

      expect(result.error).toBe(error);
    });

    it('authenticated should set token', () => {
      const token = 'some-token';
      const action = AppActions.authenticated({ token });
      const result: AppState = appReducer(initialAppState, action);

      expect(result.token).toBe(token);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;
      const result = appReducer(initialAppState, action);

      expect(result).toBe(initialAppState);
    });
  });
});
