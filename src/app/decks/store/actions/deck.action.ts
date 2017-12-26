import { Action } from '@ngrx/store'
import { Deck } from '../../models/deck.model';
import * as fromDeck from '../reducers/decks.reducer';

export const DECKS_KEY = 'decks.decks';
export const ADD_DECK = '[Deck] Add';
export const REMOVE_DECK = '[Deck] Remove';
export const PERSIST_DECK = '[Deck] Persist';
export const ACTIVATE_DECK = '[Deck] Activate';
export const UPDATE_DECK = '[Deck] Update';
export const SET_DECK_SUBREDDIT_TYPE = '[Deck] Set Subreddit Type';
export const SET_DECK_SUBREDDIT_SORT = '[Deck] Set Subreddit Sort';

export class AddDeck implements Action {
  readonly type = ADD_DECK;

  constructor(public payload: Deck) {}
}

export class RemoveDeck implements Action {
  readonly type = REMOVE_DECK;

  constructor(public payload: string) {}
}

export class PersistDeck implements Action {
  readonly type = PERSIST_DECK;

  constructor(public payload: fromDeck.State) {}
}

export class ActivateDeck implements Action {
  readonly type = ACTIVATE_DECK;

  constructor(public payload: string) {}
}

export class UpdateDeck implements Action {
  readonly type = UPDATE_DECK;

  constructor(public payload: { id: string, changes: Deck }) {}
}

export class SetDeckSubredditType implements Action {
  readonly type = SET_DECK_SUBREDDIT_TYPE;

  constructor(public payload: { id: string, subredditId: string, type: string }) {}
}

export class SetDeckSubredditSort implements Action {
  readonly type = SET_DECK_SUBREDDIT_SORT;

  constructor(public payload: { id: string, subredditId: string, sort: string }) {}
}

export type DeckActions =
  | AddDeck
  | RemoveDeck
  | PersistDeck
  | ActivateDeck
  | UpdateDeck
  | SetDeckSubredditType
  | SetDeckSubredditSort;
