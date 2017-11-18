import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Post } from '../models/post';
import * as SubredditActions from '../actions/subreddit';

export interface State extends EntityState<Post> {}

export const adapter: EntityAdapter<Post> = createEntityAdapter<Post>({
  sortComparer: (a, b) => {
    if (a.score > b.score) {
      return -1;
    }

    if (a.score < b.score) {
      return 1;
    }

    return 0;
  }
});

export const initialState: State = adapter.getInitialState();

export function reducer(
  state = initialState,
  action: SubredditActions.Actions
): State {
  switch (action.type) {
    case SubredditActions.LOAD_POSTS_SUCCESS: {
      // TODO: Use upsertMany when the method becomes available
      action.payload.posts.forEach(post => {
        state = adapter.addOne(post, state);
        state = adapter.updateOne({id: post.id, changes: post}, state);
      });
      
      return state;
    }

    default: {
      return state;
    }
  }
}
