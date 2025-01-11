import { createAction, emptyProps, props } from '@ngrx/store';
import { AppEntity } from './app.models';
import { UserDto } from '../proxy';

export const initApp = createAction('[App Page] Init');

export const dashboardOpen = createAction('[App Page] Dashboard Open');

export const loadAppSuccess = createAction(
  '[App/API] Load App Success',
  props<{ app: AppEntity }>(),
);

export const loadAppFailure = createAction(
  '[App/API] Load App Failure',
  props<{ error: any }>(),
);

export const authenticated = createAction(
  '[API] Authenticated',
  props<{ token: string }>(),
);

export const authenticatedSuccess = createAction(
  '[API] Authenticated Success',
  emptyProps,
);

export const loadProfileSuccess = createAction(
  '[API] Profile Loaded Success',
  props<{ profile: UserDto }>(),
);

export const loadProfileFailure = createAction(
  '[API] Load Profile Failure',
  props<{ error: any }>(),
);
