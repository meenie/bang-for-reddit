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

export const getSubreddit = (id: string) =>
  createSelector(
    getSubredditEntities,
    subredditEntities => subredditEntities[id]
  );

export const getSubredditPosts = (id: string) =>
  createSelector(
    getSubredditEntities,
    fromPosts.getAllPosts,
    (subredditEntities, allPosts) =>
      allPosts.filter(post => subredditEntities[id].postIds.includes(post.id))
  );
