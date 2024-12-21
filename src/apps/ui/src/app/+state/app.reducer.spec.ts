import * as AppActions from './app.actions';
import { AppState, initialAppState, appReducer } from './app.reducer';

describe('App Reducer', () => {
  describe('[App Page] Init action', () => {
    it('should retrieve the app config and update the state in an immutable way', () => {
      const action = AppActions.initApp();
      const result = appReducer(initialAppState, action);

      const expected: AppState = {
        apiBaseUrl: '',
        error: null,
        loaded: false,
        title: 'Email Sweeperr',
      };

      expect(result).toEqual(expected);
    });
  });

  describe('[App/API] Load App Success action', () => {
    it('should update the app state with the loaded app config', () => {
      const action = AppActions.loadAppSuccess({
        app: {
          title: 'New Title',
          apiBaseUrl: 'http://example.com',
        },
      });
      const result = appReducer(initialAppState, action);

      const expected: AppState = {
        apiBaseUrl: 'http://example.com',
        title: 'New Title',
        loaded: true,
      };

      expect(result).toEqual(expected);
    });
  });

  describe('[App/API] Load App Failure action', () => {
    it('should update the app state with the error message', () => {
      const action = AppActions.loadAppFailure({ error: 'An error occurred' });
      const result = appReducer(initialAppState, action);

      const expected: AppState = {
        ...initialAppState,
        error: 'An error occurred',
      };

      expect(result).toEqual(expected);
    });
  });

  // TODO: Add tests for authenticated action
  // This action is not yet implemented beyond the PoC stage
});
