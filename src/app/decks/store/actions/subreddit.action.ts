import { Action } from '@ngrx/store'
import { Post } from '../../models/post.model';

export const INITIALIZE_SUBREDDIT = '[Subreddit] Initialize';
export const LOAD_SUBREDDIT_POSTS = '[Subreddit] Load Posts';
export const LOAD_SUBREDDIT_POSTS_SUCCESS = '[Subreddit] Load Posts Success';

export class InitializeSubreddit implements Action {
  readonly type = INITIALIZE_SUBREDDIT;

  constructor(public payload: string) {}
}

export class LoadSubredditPosts implements Action {
  readonly type = LOAD_SUBREDDIT_POSTS

  constructor(public payload: { id: string, type: string, sort: string }) {}
}

export class LoadSubredditPostsSuccess implements Action {
  readonly type = LOAD_SUBREDDIT_POSTS_SUCCESS;

  constructor(public payload: { id: string, posts: Post[] }) {}
}

export type SubredditActions =
  | InitializeSubreddit
  | LoadSubredditPosts
  | LoadSubredditPostsSuccess;
