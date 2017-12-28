import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromSubreddits from '../reducers/subreddits.reducer';
import * as fromPosts from './posts.selectors';

export const getSubredditsState = createSelector(
  fromFeature.getDecksFeatureState,
  state => state.subreddits
);

export const {
  selectIds: getSubredditIds,
  selectEntities: getSubredditEntities,
  selectAll: getAllSubreddits,
  selectTotal: getTotalSubreddits
} = fromSubreddits.adapter.getSelectors(getSubredditsState);
