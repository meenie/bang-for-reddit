import { Action } from '@ngrx/store'
import { Subreddit } from '../models/subreddit';
import { Post } from '../models/post';

export const LOAD = '[Subreddit] Load';
export const LOAD_SUCCESS = '[Subreddit] Load Success';

export class Load implements Action {
  readonly type = LOAD;

  constructor(public payload: Subreddit) {}
}

export class LoadSuccess implements Action {
  readonly type = LOAD_SUCCESS;

  constructor(public payload: {subreddit: Subreddit, posts: Post[]}) {}
}

export type Actions =
  | Load
  | LoadSuccess;
