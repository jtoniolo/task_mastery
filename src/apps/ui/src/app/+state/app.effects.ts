import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { exhaustMap, catchError, of, map } from 'rxjs';
import * as AppActions from './app.actions';
import { AppConfigService } from '../config/app-config.service';
import { AppConfig } from '../config/app-config';

@Injectable()
export class AppEffects {
  private readonly appConfigService = inject(AppConfigService);
  private readonly actions$ = inject(Actions);

  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AppActions.initApp),
      exhaustMap(() =>
        this.appConfigService.loadAppConfig().pipe(
          map((config: AppConfig) =>
            AppActions.loadAppSuccess({
              app: { title: '' },
            })
          ),
          catchError((error) => of(AppActions.loadAppFailure({ error })))
        )
      )
    )
  );
}
