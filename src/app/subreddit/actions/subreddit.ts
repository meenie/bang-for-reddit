import { Action } from '@ngrx/store'
import { Subreddit } from '../models/subreddit';
import { Post } from '../models/post';

export const INITIALIZE = '[Subreddit] Initialize';
export const LOAD_POSTS = '[Subreddit] Load Posts';
export const LOAD_POSTS_SUCCESS = '[Subreddit] Load Posts Success';

export class Initialize implements Action {
  readonly type = INITIALIZE;

  constructor(public payload: Subreddit) {}
}

export class LoadPosts implements Action {
  readonly type = LOAD_POSTS

  constructor(public payload: Subreddit) {}
}

export class LoadPostsSuccess implements Action {
  readonly type = LOAD_POSTS_SUCCESS;

  constructor(public payload: {subreddit: Subreddit, posts: Post[]}) {}
}

export type Actions =
  | Initialize
  | LoadPosts
  | LoadPostsSuccess;
