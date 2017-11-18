import { Action } from '@ngrx/store'
import { Deck } from '../models/deck';
import * as fromDeck from '../reducers/decks';

export const DECKS_KEY = 'decks.decks';
export const ADD = '[Deck] Add';
export const REMOVE = '[Deck] Remove';
export const PERSIST = '[Deck] Persist';
export const PERSISTED = '[Deck] Persisted';
export const ACTIVATE = '[Deck] Activate';
export const UPDATE = '[Deck] Update';

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

export class Persisted implements Action {
  readonly type = PERSISTED;
}

export class Activate implements Action {
  readonly type = ACTIVATE;

  constructor(public payload: string) {}
}

export class Update implements Action {
  readonly type = UPDATE;

  constructor(public payload: { id: string, changes: Deck }) {}
}

export type Actions =
  | Add
  | Remove
  | Persist
  | Persisted
  | Activate
  | Update;
