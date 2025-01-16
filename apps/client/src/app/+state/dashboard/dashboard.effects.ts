import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { catchError, of, map, mergeMap } from 'rxjs';
import { DashboardService } from '../../proxy';
import { dashboardPageActions, dashboardApiActions } from './dashboard.actions';

@Injectable()
export class DashboardEffects {
  private readonly actions$ = inject(Actions);
  private readonly dashboardService = inject(DashboardService);

  dashboardOpen$ = createEffect(() =>
    this.actions$.pipe(
      ofType(dashboardPageActions.open),
      mergeMap(() => {
        return this.dashboardService.dashboardControllerIndexV1().pipe(
          map((dashboard) => {
            return dashboardApiActions.loadSuccess({ data: dashboard });
          }),
          catchError((error) => {
            return of(dashboardApiActions.loadFailure({ error }));
          }),
        );
      }),
    ),
  );
}
