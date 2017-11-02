import { Action } from '@ngrx/store'
import { Subreddit } from '../models/subreddit';

export const LOAD = '[Subreddit] Load';
export const LOAD_SUCCESS = '[Subreddit] Load Success';

export interface subredditParams {
  subreddit: string;
  type: string;
}

export class Load implements Action {
  readonly type = LOAD;

  constructor(public payload: any) {}
}

export class LoadSuccess implements Action {
  readonly type = LOAD_SUCCESS;

  constructor(public payload: Subreddit) {}
}

export type Actions = 
  | Load
  | LoadSuccess;