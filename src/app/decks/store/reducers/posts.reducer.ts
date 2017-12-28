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
      // TODO: Use upsertMany when the method becomes available
      action.payload.posts.forEach(post => {
        state = adapter.addOne(post, state);
        state = adapter.updateOne({ id: post.id, changes: post }, state);
      });

      return state;
    }

    default: {
      return state;
    }
  }
}
