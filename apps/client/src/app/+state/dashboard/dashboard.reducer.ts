import { createFeature, createReducer, on } from '@ngrx/store';
import { DashboardDto } from '../../proxy';
import { dashboardApiActions, dashboardPageActions } from './dashboard.actions';

interface DashboardState {
  loading: boolean;
  data: DashboardDto | null;
  error: any;
}

export const initialState: DashboardState = {
  loading: false,
  data: null,
  error: null,
};

export const dashboardFeature = createFeature({
  name: 'dashboard',
  reducer: createReducer(
    initialState,
    on(dashboardPageActions.open, (state) => ({ ...state, loading: true })),
    on(dashboardApiActions.load, (state) => ({ ...state, loading: true })),
    on(dashboardApiActions.loadSuccess, (state, { data }) => ({
      ...state,
      loading: false,
      data,
    })),
    on(dashboardApiActions.loadFailure, (state, { error }) => ({
      ...state,
      loading: false,
      error,
    })),
  ),
});

export const {
  name,
  reducer,
  selectDashboardState,
  selectData,
  selectError,
  selectLoading,
} = dashboardFeature;
