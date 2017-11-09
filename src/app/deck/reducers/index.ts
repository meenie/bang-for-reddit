import { createSelector, createFeatureSelector, ActionReducerMap } from '@ngrx/store';

import * as fromDecks from './decks';

export interface State {
  decks: fromDecks.State;
}

export const reducers: ActionReducerMap<State> = {
  decks: fromDecks.reducer
};

export const selectRootDeckState = createFeatureSelector<State>('decks');

export const selectDeckState = createSelector(selectRootDeckState, state => state.decks);

export const {
  selectEntities: selectDeckEntities,
  selectAll: selecAllDecks,
  selectTotal: selectTotalDecks,
} = fromDecks.adapter.getSelectors(selectDeckState);


export const selectCurrentDeckId = createSelector(selectDeckState, state => state.selectedDeckId);
export const selectCurrentDeck = createSelector(
  selectDeckEntities,
  selectCurrentDeckId,
  (deckEntities, deckId) => deckEntities[deckId]
);
export const selectCurrentDeckSubredditIds = createSelector(selectCurrentDeck, state => state.subredditIds)