import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Subreddit } from '../models/subreddit';
import * as SubredditActions from '../actions/subreddit';
import * as DeckActions from '../actions/deck';

export interface State extends EntityState<Subreddit> {}

export const adapter: EntityAdapter<Subreddit> = createEntityAdapter<Subreddit>();

export const initialState: State = adapter.getInitialState();

export function reducer(
  state = initialState,
  action: SubredditActions.Actions | DeckActions.Actions
): State {
  switch (action.type) {
    case SubredditActions.INITIALIZE: {
      return adapter.addOne({
        id: action.payload, 
        loading: true,
        loaded: false,
        postIds: []
      }, state);
    }

    case SubredditActions.LOAD_POSTS: {
      const subreddit = state.entities[action.payload.id];

      return adapter.updateOne({id: action.payload.id, changes: {
        ...subreddit,
        loading: true
      }}, state);
    } 

    case SubredditActions.LOAD_POSTS_SUCCESS: {
      const subreddit = state.entities[action.payload.id];

      return adapter.updateOne({id: action.payload.id, changes: {
        ...subreddit,
        postIds: action.payload.posts.map(post => post.id),
        loading: false,
        loaded: true
      }}, state);
    }

    case DeckActions.SET_SORT:
    case DeckActions.SET_TYPE: {
      const subreddit = state.entities[action.payload.subredditId]

      return adapter.updateOne({id: action.payload.subredditId, changes: {
        ...subreddit,
        loaded: false
      }}, state);
    }

    default: {
      return state;
    }
  }
}
