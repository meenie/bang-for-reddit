import { Action } from '@ngrx/store'
import { Deck } from '../models/deck';

export const ADD = '[Deck] Add';
export const REMOVE = '[Deck] Remove';
export const ACTIVATE = '[Deck] Load';
export const UPDATE = '[Deck] Update';

export class Add implements Action {
  readonly type = ADD;

  constructor(public payload: Deck) {}
}

export class Remove implements Action {
  readonly type = REMOVE;

  constructor(public payload: string) {}
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
  | Activate
  | Update;