import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { hot } from 'jasmine-marbles';
import { Observable, of } from 'rxjs';

import * as AppActions from './app.actions';
import { AppEffects } from './app.effects';
import { AppConfigService } from '../config/app-config.service';
import { AppConfig } from '../config/app-config';

jest.mock('../config/app-config.service');

describe('AppEffects', () => {
  let actions: Observable<Action>;
  let effects: AppEffects;
  let appConfigService: jest.Mocked<AppConfigService>;
  const mockAppConfig: AppConfig = {
    apiUrl: 'https://api.example.com',
    featureFlag: true,
  };

  beforeEach(() => {
    appConfigService = new AppConfigService() as jest.Mocked<AppConfigService>;
    appConfigService.loadAppConfig.mockReturnValue(of(mockAppConfig));

    TestBed.configureTestingModule({
      imports: [],
      providers: [
        AppEffects,
        provideMockActions(() => actions),
        provideMockStore(),
        { provide: AppConfigService, useValue: appConfigService },
      ],
    });

    effects = TestBed.inject(AppEffects);
  });

  describe('init$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: AppActions.initApp() });

      const expected = hot('-a-|', {
        a: AppActions.loadAppSuccess({ app: { title: '' } }),
      });

      expect(effects.init$).toBeObservable(expected);
    });
  });
});
