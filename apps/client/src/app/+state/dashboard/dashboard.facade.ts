import { Injectable, inject } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { dashboardPageActions } from './dashboard.actions';
import { dashboardFeature } from './dashboard.reducer';

@Injectable()
export class DashboardFacade {
  private readonly store = inject(Store);

  dashboardOpen() {
    this.store.dispatch(dashboardPageActions.open());
  }
  drillDown(key: string) {
    this.store.dispatch(dashboardPageActions.drillDown({ key }));
  }
  quickDelete(key: string) {
    this.store.dispatch(dashboardPageActions.quickDelete({ key }));
  }

  dashboard$ = this.store.pipe(select(dashboardFeature.selectData));
  unprocessedMessages$ = this.store.pipe(
    select(dashboardFeature.selectUnprocessedMessages),
  );
}
