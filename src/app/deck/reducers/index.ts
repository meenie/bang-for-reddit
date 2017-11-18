import { createSelector, createFeatureSelector, ActionReducerMap } from '@ngrx/store';

import * as fromDecks from './decks';

export interface State {
  decks: fromDecks.State;
}

export const reducers: ActionReducerMap<State> = {
  decks: fromDecks.reducer
};

export const selectFeatureState = createFeatureSelector<State>('decks');

export const selectDecksState = createSelector(selectFeatureState, state => state.decks);

export const {
  selectEntities: selectDeckEntities,
  selectAll: selecAllDecks,
  selectTotal: selectTotalDecks,
} = fromDecks.adapter.getSelectors(selectDecksState);

export const selectCurrentDeckId = createSelector(selectDecksState, state => state.selectedDeckId);

export const selectCurrentDeck = createSelector(
  selectDeckEntities,
  selectCurrentDeckId,
  (deckEntities, deckId) => deckEntities[deckId]
);

export const selectDeckById = (id: string) => createSelector(
  selectDeckEntities,
  (deckEntities) => deckEntities[id]
)
