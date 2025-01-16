import { AppEffects } from './app.effects';
import { AppFacade } from './app.facade';
import { appReducer, APP_FEATURE_KEY } from './app.reducer';
import { dashboardFeature } from './dashboard/dashboard.reducer';
import {
  dashboardApiActions,
  dashboardPageActions,
} from './dashboard/dashboard.actions';
import { DashboardEffects } from './dashboard/dashboard.effects';
import { DashboardFacade } from './dashboard/dashboard.facade';

export { appReducer, APP_FEATURE_KEY, AppEffects, AppFacade };
export {
  dashboardFeature,
  dashboardApiActions,
  dashboardPageActions,
  DashboardEffects,
  DashboardFacade,
};
