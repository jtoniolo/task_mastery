import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { AppEffects } from './app.effects';
import { initApp, loadAppSuccess } from './app.actions';
import { AppConfigService } from '../config/app-config.service';
import { Injectable } from '@angular/core';
import { AppConfig } from '../config/app-config';
import { BASE_PATH } from '../proxy';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('AppEffects', () => {
  let actions$ = new Observable<Action>();
  let effects: AppEffects;
  let config = { title: 'New Title', apiBaseUrl: 'http://example.com' };
  @Injectable()
  class MockAppConfigService {
    get config(): AppConfig {
      return config;
    }
  }

  TestBed.configureTestingModule({
    providers: [
      provideMockActions(() => actions$),
      provideHttpClient(),
      provideHttpClientTesting(),
    ],
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AppEffects,
        {
          provide: AppConfigService,
          useClass: MockAppConfigService,
        },
        { provide: BASE_PATH, useValue: 'http://example.com' },
      ],
    });

    effects = TestBed.inject(AppEffects);
  });

  it('init$ should return loadAppSuccess', () => {
    // Arrange
    const expectedAction = loadAppSuccess({ app: { ...config } });

    //Act
    actions$ = of(initApp());

    //Assert
    effects.init$.subscribe((x) => {
      expect(x).toEqual(expectedAction);
    });
  });
});
