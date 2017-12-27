import { Action } from '@ngrx/store';

export const VERIFY = '[Version] Verify';
export const CHECK = '[Version] Check';

export class Verify implements Action {
  readonly type = VERIFY;

  constructor(public payload: string) {}
}

export class Check implements Action {
  readonly type = CHECK;
}

export type VersionActions = Verify | Check;
