import { createSelector, createFeatureSelector, ActionReducerMap } from '@ngrx/store';

import * as fromDecks from './decks';
import * as fromPosts from './posts';
import * as fromSubreddits from './subreddits';

export interface State {
  decks: fromDecks.State;
  posts: fromPosts.State;
  subreddits: fromSubreddits.State;
}

export const reducers: ActionReducerMap<State> = {
  decks: fromDecks.reducer,
  posts: fromPosts.reducer,
  subreddits: fromSubreddits.reducer
};

export const selectFeatureState = createFeatureSelector<State>('decks');

export const selectDecksState = createSelector(selectFeatureState, state => state.decks);
export const selectPostsState = createSelector(selectFeatureState, state => state.posts);
export const selectSubredditsState = createSelector(selectFeatureState, state => state.subreddits);

export const {
  selectEntities: selectDeckEntities,
  selectAll: selecAllDecks,
  selectTotal: selectTotalDecks,
} = fromDecks.adapter.getSelectors(selectDecksState);

export const {
  selectIds: selectPostIds,
  selectEntities: selectPostEntities,
  selectAll: selectAllPosts,
  selectTotal: selectTotalPosts,
} = fromPosts.adapter.getSelectors(selectPostsState);

export const {
  selectIds: selectSubredditIds,
  selectEntities: selectSubredditEntities,
  selectAll: selectAllSubreddits,
  selectTotal: selectTotalSubreddits,
} = fromSubreddits.adapter.getSelectors(selectSubredditsState);

export const selectCurrentDeckId = createSelector(selectDecksState, state => state.selectedDeckId);
export const selectCurrentDeck = createSelector(
  selectDeckEntities,
  selectDecksState,
  (deckEntities, deckState) => deckEntities[deckState.selectedDeckId]
);

export const selectCurrentDeckSubredditIds = createSelector(
  selectCurrentDeck,
  (deck) => {
    return deck ? deck.subredditIds : []
  }
)

export const selectCurrentDeckSubredditSettings = createSelector(
  selectCurrentDeck,
  (deck) => {
    return deck ? deck.subredditSettings : {}
  }
)

export const selectSubreddit = (id: string) => createSelector(
  selectSubredditEntities,
  subredditEntities => subredditEntities[id]
)

export const selectSubredditSettings = (id: string) => createSelector(
  selectCurrentDeckSubredditSettings,
  subredditSettings => subredditSettings[id]
)

export const selectSubredditPosts = (id: string) => createSelector(
  selectSubredditEntities,
  selectAllPosts,
  (subredditEntities, allPosts) => allPosts.filter(post => subredditEntities[id].postIds.includes(post.id))
)

