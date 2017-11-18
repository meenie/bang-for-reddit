import { createSelector, createFeatureSelector, ActionReducerMap } from '@ngrx/store';
import * as fromPosts from './posts';
import * as fromSubreddits from './subreddits';
import * as fromRoot from '../../reducers';

export interface State {
  posts: fromPosts.State;
  subreddits: fromSubreddits.State;
}

export const reducers: ActionReducerMap<State> = {
  posts: fromPosts.reducer,
  subreddits: fromSubreddits.reducer
};

export const selectFeatureState = createFeatureSelector<State>('subreddit');

export const selectPostsState = createSelector(
  selectFeatureState,
  state => state.posts
);

export const selectSubredditsState = createSelector(
  selectFeatureState,
  state => state.subreddits
);

export const {
  selectIds: selectPostIds,
  selectEntities: selectPostEntities,
  selectAll: selectAllPosts,
  selectTotal: selectTotalPosts,
} = fromPosts.adapter.getSelectors(selectPostsState);

export const {
  selectIds: selectSubredditIds,
  selectEntities: selectSubredditEntities,
  selectAll: selectAllSubreddits,
  selectTotal: selectTotalSubreddits,
} = fromSubreddits.adapter.getSelectors(selectSubredditsState);

export const selectSubredditWithPosts = (id: string) => createSelector(
  selectSubredditEntities,
  selectAllPosts,
  (subredditEntities, allPosts) => {
    let subreddit = subredditEntities[id]

    return {
      subreddit,
      posts: allPosts.filter(post => subreddit.postIds.includes(post.id))
    }
  }
)
