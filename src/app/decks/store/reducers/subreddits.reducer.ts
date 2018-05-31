import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Subreddit } from '../../models/subreddit.model';
import * as fromSubreddit from '../actions/subreddit.action';
import * as fromDeck from '../actions/deck.action';

export interface State extends EntityState<Subreddit> {}

export const adapter: EntityAdapter<Subreddit> = createEntityAdapter<
  Subreddit
>();

export const initialState: State = adapter.getInitialState();

export function reducer(
  state = initialState,
  action: fromSubreddit.SubredditActions | fromDeck.DeckActions
): State {
  switch (action.type) {
    case fromSubreddit.INITIALIZE_SUBREDDITS: {
      const data = action.payload.map(id => {
        return {
          id,
          loading: true,
          loaded: false,
          postIds: []
        }
      })

      return adapter.upsertMany(data, state);
    }

    case fromSubreddit.LOAD_SUBREDDIT_POSTS: {
      const subreddit = state.entities[action.payload.id];

      return adapter.updateOne(
        {
          id: action.payload.id,
          changes: {
            ...subreddit,
            loading: true
          }
        },
        state
      );
    }

    case fromSubreddit.LOAD_SUBREDDIT_POSTS_SUCCESS: {
      const subreddit = state.entities[action.payload.id];
      const postIds = action.payload.posts.map(post => {
        return {
          id: post.id,
          score: post.score,
          order: post.order
        }
      }).sort((a, b) => {
        switch (action.payload.type) {
          case 'rising':
            return b.score - a.score;
          default:
            return a.order - b.order;
        }
      }).map(post => post.id)

      return adapter.updateOne(
        {
          id: action.payload.id,
          changes: {
            ...subreddit,
            postIds,
            loading: false,
            loaded: true
          }
        },
        state
      );
    }

    case fromDeck.SET_DECK_SUBREDDIT_TYPE: {
      const subreddit = state.entities[action.payload.subredditId];

      return adapter.updateOne(
        {
          id: action.payload.subredditId,
          changes: {
            ...subreddit,
            loaded: false
          }
        },
        state
      );
    }

    case fromDeck.ADD_SUBREDDIT_TO_DECK: {
      const { subredditId } = action.payload;
      const subreddit = state.entities[subredditId] || {
        id: subredditId,
        loading: true,
        loaded: false,
        postIds: []
      };

      return adapter.upsertOne(subreddit, state);
    }

    default: {
      return state;
    }
  }
}
