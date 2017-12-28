import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromPosts from '../reducers/posts.reducer';

export const getPostsState = createSelector(
  fromFeature.getDecksFeatureState,
  state => state.posts
);

export const {
  selectIds: getPostIds,
  selectEntities: getPostEntities,
  selectAll: getAllPosts,
  selectTotal: getTotalPosts
} = fromPosts.adapter.getSelectors(getPostsState);
