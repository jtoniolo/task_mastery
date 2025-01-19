import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { catchError, of, map, mergeMap } from 'rxjs';
import { GmailService } from '../../proxy';
import { gmailApiActions } from './gmail.actions'; //gmailPageActions

@Injectable()
export class GmailEffects {
  private readonly actions$ = inject(Actions);
  private readonly gmailService = inject(GmailService);

  gmailOpen$ = createEffect(() =>
    this.actions$.pipe(
      ofType(gmailApiActions.load),
      mergeMap(() => {
        return this.gmailService.gmailControllerGetLabelsV1().pipe(
          map((labels) => {
            return gmailApiActions.loadSuccess({ data: labels });
          }),
          catchError((error) => {
            return of(gmailApiActions.loadFailure({ error }));
          }),
        );
      }),
    ),
  );

  // Load the labels unless they have been loaded before, unless the force flag is true
  loadLabels$ = createEffect(() =>
    this.actions$.pipe(
      ofType(gmailApiActions.loadLabels),
      mergeMap(() => {
        return this.gmailService.gmailControllerGetLabelsV1().pipe(
          map((labels) => {
            return gmailApiActions.loadSuccess({ data: labels });
          }),
          catchError((error) => {
            return of(gmailApiActions.loadFailure({ error }));
          }),
        );
      }),
    ),
  );
}
