import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as fromPosts from './posts';
import * as fromMetadata from './metadata';
import * as fromRoot from '../../reducers';

export interface SubredditState {
  posts: fromPosts.State;
  metadata: fromMetadata.State;
}

export interface State extends fromRoot.State {
  'subreddit': SubredditState;
}

export const reducers = {
  posts: fromPosts.reducer,
  metadata: fromMetadata.reducer
};


/**
 * The createFeatureSelector function selects a piece of state from the root of the state object.
 * This is used for selecting feature states that are loaded eagerly or lazily.
*/
export const getSubredditState = createFeatureSelector<SubredditState>('subreddit');

/**
 * Every reducer module exports selector functions, however child reducers
 * have no knowledge of the overall state tree. To make them useable, we
 * need to make new selectors that wrap them.
 *
 * The createSelector function creates very efficient selectors that are memoized and
 * only recompute when arguments change. The created selectors can also be composed
 * together to select different pieces of state.
 */
export const getPostsState = createSelector(
  getSubredditState,
  state => state.posts
);

/**
 * Adapters created with @ngrx/entity generate
 * commonly used selector functions including
 * getting all ids in the record set, a dictionary
 * of the records by id, an array of records and
 * the total number of records. This reducers boilerplate
 * in selecting records from the entity state.
 */
export const {
  selectIds: getPostIds,
  selectEntities: getPostEntities,
  selectAll: getAllPosts,
  selectTotal: getTotalPosts,
} = fromPosts.adapter.getSelectors(getPostsState);


export const getMetadataState = createSelector(
  getSubredditState,
  state => state.metadata
);
export const getSubredditId = createSelector(
  getMetadataState,
  fromMetadata.getId
);
export const getSubredditLoaded = createSelector(
  getMetadataState,
  fromMetadata.getLoaded
);
export const getSubredditLoading = createSelector(
  getMetadataState,
  fromMetadata.getLoading
);
export const getSubredditPostIds = createSelector(
  getMetadataState,
  fromMetadata.getPostIds
);