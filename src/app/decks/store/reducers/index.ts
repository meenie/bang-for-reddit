import { createFeatureSelector, ActionReducerMap } from '@ngrx/store';

import * as fromDecks from './decks.reducer';
import * as fromPosts from './posts.reducer';
import * as fromSubreddits from './subreddits.reducer';

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

export const getDecksFeatureState = createFeatureSelector<State>('decks');
