import { Action } from '@ngrx/store'
import { Deck } from '../models/deck';
import * as fromDeck from '../reducers/decks';

export const DECKS_KEY = 'decks.decks';
export const ADD = '[Deck] Add';
export const REMOVE = '[Deck] Remove';
export const PERSIST = '[Deck] Persist';
export const ACTIVATE = '[Deck] Activate';
export const UPDATE = '[Deck] Update';
export const SET_TYPE = '[Deck] Set Subreddit Type';
export const SET_SORT = '[Deck] Set Subreddit Sort';

export class Add implements Action {
  readonly type = ADD;

  constructor(public payload: Deck) {}
}

export class Remove implements Action {
  readonly type = REMOVE;

  constructor(public payload: string) {}
}

export class Persist implements Action {
  readonly type = PERSIST;

  constructor(public payload: fromDeck.State) {}
}

export class Activate implements Action {
  readonly type = ACTIVATE;

  constructor(public payload: string) {}
}

export class Update implements Action {
  readonly type = UPDATE;

  constructor(public payload: { id: string, changes: Deck }) {}
}

export class SetType implements Action {
  readonly type = SET_TYPE;

  constructor(public payload: { id: string, subredditId: string, type: string }) {}
}

export class SetSort implements Action {
  readonly type = SET_SORT;

  constructor(public payload: { id: string, subredditId: string, sort: string }) {}
}

export type Actions =
  | Add
  | Remove
  | Persist
  | Activate
  | Update
  | SetType
  | SetSort;
