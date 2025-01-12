import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { exhaustMap, catchError, of, map, switchMap } from 'rxjs';
import * as AppActions from './app.actions';
import { AppConfigService } from '../config/app-config.service';
import { AppConfig } from '../config/app-config';
import { Router } from '@angular/router';
import { BASE_PATH, UsersService } from '../proxy';

@Injectable()
export class AppEffects {
  private readonly router = inject(Router);
  private readonly appConfigService = inject(AppConfigService);
  private readonly base = inject(BASE_PATH);
  private readonly usersService = inject(UsersService);
  private readonly actions$ = inject(Actions);

  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AppActions.initApp),
      exhaustMap(() =>
        this.appConfigService.init().pipe(
          map((config: AppConfig) =>
            AppActions.loadAppSuccess({
              app: { ...config },
            }),
          ),
          catchError((error) => of(AppActions.loadAppFailure({ error }))),
        ),
      ),
    ),
  );

  authenticated$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AppActions.authenticated),
      exhaustMap(() => {
        return this.usersService.userControllerGetProfileV1().pipe(
          map((profile) => {
            return AppActions.loadProfileSuccess({ profile });
          }),
          catchError((error) => {
            this.router.navigate(['/welcome']);
            return of(AppActions.loadProfileFailure({ error }));
          }),
        );
      }),
    ),
  );

  dashboardOpen$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AppActions.dashboardOpen),
      switchMap(() => {
        return this.usersService.userControllerGetProfileV1().pipe(
          map((profile) => {
            return AppActions.loadProfileSuccess({ profile });
          }),
          catchError((error) => {
            this.router.navigate(['/welcome']);
            return of(AppActions.loadProfileFailure({ error }));
          }),
        );
      }),
    ),
  );
}
