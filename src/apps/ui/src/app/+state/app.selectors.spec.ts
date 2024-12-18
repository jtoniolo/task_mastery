import {
  selectAppState,
  selectAppLoaded,
  selectAppError,
  selectAllApp,
} from './app.selectors';
import { AppState } from './app.reducer';

describe('App Selectors', () => {
  const initialState: AppState = {
    loaded: false,
    error: null,
    title: 'Test Title',
  };

  it('should select the feature state', () => {
    const result = selectAppState.projector(initialState);
    expect(result).toEqual(initialState);
  });

  it('should select the loaded state', () => {
    const result = selectAppLoaded.projector(initialState);
    expect(result).toBe(false);
  });

  it('should select the error state', () => {
    const result = selectAppError.projector(initialState);
    expect(result).toBeNull();
  });

  it('should select all app state', () => {
    const result = selectAllApp.projector(initialState);
    expect(result).toEqual(initialState);
  });
});
