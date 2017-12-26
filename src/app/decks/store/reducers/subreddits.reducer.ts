import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Subreddit } from '../../models/subreddit.model';
import * as fromSubreddit from '../actions/subreddit.action';
import * as fromDeck from '../actions/deck.action';

export interface State extends EntityState<Subreddit> {}

export const adapter: EntityAdapter<Subreddit> = createEntityAdapter<Subreddit>();

export const initialState: State = adapter.getInitialState();

export function reducer(
  state = initialState,
  action: fromSubreddit.SubredditActions | fromDeck.DeckActions
): State {
  switch (action.type) {
    case fromSubreddit.INITIALIZE_SUBREDDIT: {
      const data = {
        id: action.payload,
        loading: true,
        loaded: false,
        postIds: []
      };

      // TODO: Use upsertMany when the method becomes available
      state = adapter.addOne(data, state);
      return adapter.updateOne({id: data.id, changes: data}, state);
    }

    case fromSubreddit.LOAD_SUBREDDIT_POSTS: {
      const subreddit = state.entities[action.payload.id];

      return adapter.updateOne({id: action.payload.id, changes: {
        ...subreddit,
        loading: true
      }}, state);
    }

    case fromSubreddit.LOAD_SUBREDDIT_POSTS_SUCCESS: {
      const subreddit = state.entities[action.payload.id];

      return adapter.updateOne({id: action.payload.id, changes: {
        ...subreddit,
        postIds: action.payload.posts.map(post => post.id),
        loading: false,
        loaded: true
      }}, state);
    }

    case fromDeck.SET_DECK_SUBREDDIT_SORT:
    case fromDeck.SET_DECK_SUBREDDIT_TYPE: {
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
