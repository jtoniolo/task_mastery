import { createFeature, createReducer, on, createSelector } from '@ngrx/store';
import { dashboardDtoToDashboardData } from './dashboard.utils';
import { dashboardApiActions, dashboardPageActions } from './dashboard.actions';
import { DashboardData } from './dashboard.models';

interface DashboardState {
  loading: boolean;
  data: DashboardData | null;
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
      data: dashboardDtoToDashboardData(data),
    })),
    on(dashboardApiActions.loadFailure, (state, { error }) => ({
      ...state,
      loading: false,
      error,
    })),
  ),
  extraSelectors: ({ selectData }) => {
    const selectUnprocessedMessages = createSelector(
      selectData,
      (data) =>
        data?.topTenSenderDomains.find((sender) => !sender?.title)?.value,
    );
    return {
      selectUnprocessedMessages,
    };
  },
});

export const {
  name,
  reducer,
  selectDashboardState,
  selectData,
  selectError,
  selectLoading,
  selectUnprocessedMessages,
} = dashboardFeature;
