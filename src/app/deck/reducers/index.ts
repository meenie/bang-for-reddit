import { createSelector, createFeatureSelector, ActionReducerMap } from '@ngrx/store';

import * as fromRoot from '../../reducers';
import * as fromSubreddits from './subreddits';

export interface DeckState {
  subreddits: fromSubreddits.State
}

export interface State extends fromRoot.State {
  'deck': DeckState;
}

export const reducers: ActionReducerMap<DeckState> = {
  subreddits: fromSubreddits.reducer
};

export const getDeckState = createFeatureSelector<DeckState>('deck');

export const getSubredditsState = createSelector(
  getDeckState,
  state => state.subreddits
);

export const {
  selectIds: getSubredditIds,
  selectEntities: getSubredditEntities,
  selectAll: getAllSubreddits,
  selectTotal: getTotalSubreddits,
} = fromSubreddits.adapter.getSelectors(getSubredditsState);
