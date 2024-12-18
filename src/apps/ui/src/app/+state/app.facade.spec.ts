import { TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { AppFacade } from './app.facade';
import * as AppActions from './app.actions';
import * as AppSelectors from './app.selectors';
import { AppState } from './app.reducer';

describe('AppFacade', () => {
  let store: MockStore;
  let facade: AppFacade;

  const initialState = {
    loaded: false,
    allApp: [],
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AppFacade, provideMockStore({ initialState })],
    });

    store = TestBed.inject(MockStore);
    facade = TestBed.inject(AppFacade);
  });

  it('loaded$ should select the loaded state', (done) => {
    const expected = true;
    store.overrideSelector(AppSelectors.selectAppLoaded, expected);

    facade.loaded$.subscribe((loaded) => {
      expect(loaded).toBe(expected);
      done();
    });
  });

  it('allApp$ should select all app state', (done) => {
    const expected: AppState = { loaded: true, title: '' };
    store.overrideSelector(AppSelectors.selectAllApp, expected);

    facade.allApp$.subscribe((allApp) => {
      expect(allApp).toEqual(expected);
      done();
    });
  });

  it('authenticated should dispatch authenticated action', () => {
    const token = 'some-token';
    const spy = jest.spyOn(store, 'dispatch');

    facade.authenticated(token);

    expect(spy).toHaveBeenCalledWith(AppActions.authenticated({ token }));
  });

  it('init should dispatch initApp action', () => {
    const spy = jest.spyOn(store, 'dispatch');

    facade.init();

    expect(spy).toHaveBeenCalledWith(AppActions.initApp());
  });
});
