import { Action } from '@ngrx/store'
import { Subreddit } from '../models/subreddit';
import { Post } from '../models/post';

export const INITIALIZE = '[Subreddit] Initialize';
export const LOAD_POSTS = '[Subreddit] Load Posts';
export const LOAD_POSTS_SUCCESS = '[Subreddit] Load Posts Success';
export const SET_TYPE = '[Subreddit] Update';

export class Initialize implements Action {
  readonly type = INITIALIZE;

  constructor(public payload: string) {}
}

export class LoadPosts implements Action {
  readonly type = LOAD_POSTS

  constructor(public payload: { id: string, type: string, sort: string }) {}
}

export class LoadPostsSuccess implements Action {
  readonly type = LOAD_POSTS_SUCCESS;

  constructor(public payload: { id: string, posts: Post[] }) {}
}

export type Actions =
  | Initialize
  | LoadPosts
  | LoadPostsSuccess;
