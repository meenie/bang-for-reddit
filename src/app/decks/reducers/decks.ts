import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Deck } from '../models/deck';
import * as DeckActions from '../actions/deck';

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
  action: DeckActions.Actions
): State {
  switch (action.type) {
    case DeckActions.ADD: {
      return adapter.addOne(action.payload, state);
    }

    case DeckActions.REMOVE: {
      return adapter.removeOne(action.payload, state);
    }

    case DeckActions.ACTIVATE: {
      return {
        ...state,
        selectedDeckId: action.payload,
      };
    }

    case DeckActions.UPDATE: {
      return adapter.updateOne(action.payload, state);
    }

    case DeckActions.SET_TYPE: {
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

    case DeckActions.SET_SORT: {
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

export const getSelectedDeckId = (state: State) => state.selectedDeckId;
