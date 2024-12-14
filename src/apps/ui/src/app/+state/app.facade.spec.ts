import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';
import { readFirst } from '@nx/angular/testing';

import * as AppActions from './app.actions';
import { AppEffects } from './app.effects';
import { AppFacade } from './app.facade';
import { AppEntity } from './app.models';
import {
  APP_FEATURE_KEY,
  AppState,
  initialAppState,
  appReducer,
} from './app.reducer';
import * as AppSelectors from './app.selectors';

interface TestSchema {
  app: AppState;
}
