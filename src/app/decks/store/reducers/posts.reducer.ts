import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Post } from '../../models/post.model';
import * as fromSubreddit from '../actions/subreddit.action';

export interface State extends EntityState<Post> {}

export const adapter: EntityAdapter<Post> = createEntityAdapter<Post>();

export const initialState: State = adapter.getInitialState();

export function reducer(
  state = initialState,
  action: fromSubreddit.SubredditActions
): State {
  switch (action.type) {
    case fromSubreddit.LOAD_SUBREDDIT_POSTS_SUCCESS: {
      const posts = action.payload.posts;

      return adapter.upsertMany(posts.map(post => ({id: post.id, changes: post})), state);
    }

    default: {
      return state;
    }
  }
}
