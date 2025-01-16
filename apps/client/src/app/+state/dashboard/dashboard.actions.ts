import { emptyProps, props, createActionGroup } from '@ngrx/store';
import { DashboardDto } from '../../proxy';

export const dashboardPageActions = createActionGroup({
  source: 'Dashboard Page',
  events: {
    open: emptyProps(),
  },
});

export const dashboardApiActions = createActionGroup({
  source: 'Dashboard API',
  events: {
    load: emptyProps(),
    loadSuccess: props<{ data: DashboardDto }>(),
    loadFailure: props<{ error: any }>(),
  },
});
