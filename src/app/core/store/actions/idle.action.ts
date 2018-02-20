import { Action } from '@ngrx/store';

export const SET_IDLE = '[Idle] Set Idle';

export class SetIdle implements Action {
  readonly type = SET_IDLE;

  constructor(public payload: boolean) {}
}

export type IdleActions = SetIdle;
