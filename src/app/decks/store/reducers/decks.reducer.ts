import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Deck } from '../../models/deck.model';
import * as fromDeck from '../actions/deck.action';

export interface State extends EntityState<Deck> {
  selectedDeckId: string | null;
}

export const adapter: EntityAdapter<Deck> = createEntityAdapter<Deck>();

export const initialState: State = adapter.getInitialState({
  selectedDeckId: null,
  ids: ['default'],
  entities: {
    default: {
      id: 'default',
      name: 'Default Deck',
      subredditIds: ['all', 'politics'],
      subredditSettings: {
        all: {
          type: 'top',
          sort: 'score'
        },
        politics: {
          type: 'rising',
          sort: 'score'
        }
      }
    }
  }
});

export function reducer(
  state = initialState,
  action: fromDeck.DeckActions
): State {
  switch (action.type) {
    case fromDeck.ADD_DECK: {
      return adapter.addOne(action.payload, state);
    }

    case fromDeck.REMOVE_DECK: {
      return adapter.removeOne(action.payload, state);
    }

    case fromDeck.ACTIVATE_DECK: {
      return {
        ...state,
        selectedDeckId: action.payload,
      };
    }

    case fromDeck.SET_DECK_SUBREDDIT_TYPE: {
      const {id, subredditId, type} = action.payload;
      const deck = state.entities[id];
      const subredditSettings = { ...deck.subredditSettings};
      const settings = {...subredditSettings[subredditId], type};
      subredditSettings[subredditId] = settings;

      const update = {
        id,
        changes: {...deck, subredditSettings}
      }

      return adapter.updateOne(update, state);
    }

    case fromDeck.SET_DECK_SUBREDDIT_SORT: {
      const {id, subredditId, sort} = action.payload;
      const deck = state.entities[id];
      const subredditSettings = { ...deck.subredditSettings};
      const settings = {...subredditSettings[subredditId], sort};
      subredditSettings[subredditId] = settings;

      const update = {
        id,
        changes: {...deck, subredditSettings}
      }

      return adapter.updateOne(update, state);
    }

    default: {
      return state;
    }
  }
}
