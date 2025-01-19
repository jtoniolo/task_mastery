import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { catchError, of, map, mergeMap, tap } from 'rxjs';
import { DashboardService } from '../../proxy';
import { dashboardPageActions, dashboardApiActions } from './dashboard.actions';
import { GmailFacade } from '../gmail/gmail.facade';

@Injectable()
export class DashboardEffects {
  private readonly actions$ = inject(Actions);
  private readonly dashboardService = inject(DashboardService);
  private readonly gmailFacade = inject(GmailFacade);

  dashboardOpen$ = createEffect(() =>
    this.actions$.pipe(
      ofType(dashboardPageActions.open),
      tap(() => {
        // The dashboard also needs the labels from Gmail, but the Gmail store handles these
        this.gmailFacade.loadLabels();
      }),
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
