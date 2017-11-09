import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Deck } from '../models/deck';
import * as DeckActions from '../actions/deck';

export interface State extends EntityState<Deck> {
  selectedDeckId: string | null;
}

export const adapter: EntityAdapter<Deck> = createEntityAdapter<Deck>();

export const initialState: State = adapter.getInitialState({
  selectedDeckId: null
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

    default: {
      return state;
    }
  }
}

export const getSelectedDeckId = (state: State) => state.selectedDeckId;
