import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Subreddit } from '../models/subreddit';
import * as SubredditActions from '../actions/subreddit';

export interface State extends EntityState<Subreddit> {}

export const adapter: EntityAdapter<Subreddit> = createEntityAdapter<Subreddit>();

export const initialState: State = adapter.getInitialState();

export function reducer(
  state = initialState,
  action: SubredditActions.Actions
): State {
  switch (action.type) {
    case SubredditActions.INITIALIZE: {
      return adapter.addOne({...action.payload, loading: true}, state);
    }

    case SubredditActions.LOAD_POSTS_SUCCESS: {
      let subreddit = action.payload.subreddit;
      return adapter.updateOne({id: subreddit.id, changes: {
        ...subreddit,
        postIds: action.payload.posts.map(post => post.id),
        loaded: true,
        loading: false
      }}, state)
    }

    default: {
      return state;
    }
  }
}
