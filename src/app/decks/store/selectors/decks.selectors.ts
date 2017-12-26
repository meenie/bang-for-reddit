import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromDecks from '../reducers/decks.reducer';

export const getDecksState = createSelector(fromFeature.getDecksFeatureState, state => state.decks);

export const {
  selectEntities: getDeckEntities,
  selectAll: getAllDecks,
  selectTotal: getTotalDecks,
} = fromDecks.adapter.getSelectors(getDecksState);

export const getCurrentDeckId = createSelector(getDecksState, state => state.selectedDeckId);
export const getCurrentDeck = createSelector(
  getDeckEntities,
  getDecksState,
  (deckEntities, deckState) => deckEntities[deckState.selectedDeckId]
);

export const getCurrentDeckSubredditIds = createSelector(
  getCurrentDeck,
  (deck) => {
    return deck ? deck.subredditIds : []
  }
)

export const getCurrentDeckSubredditSettings = createSelector(
  getCurrentDeck,
  (deck) => {
    return deck ? deck.subredditSettings : {}
  }
)

export const getSubredditSettings = (id: string) => createSelector(
  getCurrentDeckSubredditSettings,
  subredditSettings => subredditSettings[id]
)