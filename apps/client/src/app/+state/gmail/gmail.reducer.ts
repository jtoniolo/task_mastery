import { createFeature, createReducer, createSelector, on } from '@ngrx/store';
import { GmailEntity } from './gmail.models';
import { gmailApiActions, gmailPageActions } from './gmail.actions';

interface GmailState extends GmailEntity {
  loading: boolean;
  error: any;
}

const initialState: GmailState = {
  labels: [],
  loading: false,
  error: null,
};

export const gmailFeature = createFeature({
  name: 'gmail',
  reducer: createReducer(
    initialState,
    on(gmailPageActions.open, (state) => ({ ...state, loading: true })),
    on(gmailApiActions.load, (state) => ({ ...state, loading: true })),
    on(gmailApiActions.loadSuccess, (state, { data }) => ({
      ...state,
      loading: false,
      labels: data,
    })),
    on(gmailApiActions.loadFailure, (state, { error }) => ({
      ...state,
      loading: false,
      error,
    })),
  ),
  extraSelectors: ({ selectLabels }) => {
    const selectLabelsIsLoaded = createSelector(
      selectLabels,
      (labels) => labels.length > 0,
    );

    return {
      selectLabelsIsLoaded,
    };
  },
});

export const {
  name,
  reducer,
  selectGmailState,
  selectLabels,
  selectError,
  selectLoading,
} = gmailFeature;
