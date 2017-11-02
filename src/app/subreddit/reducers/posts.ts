import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Post } from '../models/post';
import * as SubredditActions from '../actions/subreddit';

export interface State extends EntityState<Post> {}

export const adapter: EntityAdapter<Post> = createEntityAdapter<Post>();

export const initialState: State = adapter.getInitialState();

export function reducer(
  state = initialState,
  action: SubredditActions.Actions
): State {
  switch (action.type) {
    case SubredditActions.LOAD_SUCCESS: {
      return adapter.addAll(action.payload.posts, state);
    }

    default: {
      return state;
    }
  }
}