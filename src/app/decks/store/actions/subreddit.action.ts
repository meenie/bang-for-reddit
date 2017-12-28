import { Action } from '@ngrx/store';
import { Post } from '../../models/post.model';

export const INITIALIZE_SUBREDDITS = '[Subreddit] Initialize Subreddits';
export const LOAD_SUBREDDIT_POSTS = '[Subreddit] Load Posts';
export const LOAD_SUBREDDIT_POSTS_SUCCESS = '[Subreddit] Load Posts Success';

export class InitializeSubreddits implements Action {
  readonly type = INITIALIZE_SUBREDDITS;

  constructor(public payload: string[]) {}
}

export class LoadSubredditPosts implements Action {
  readonly type = LOAD_SUBREDDIT_POSTS;

  constructor(public payload: { id: string; type: string }) {}
}

export class LoadSubredditPostsSuccess implements Action {
  readonly type = LOAD_SUBREDDIT_POSTS_SUCCESS;

  constructor(public payload: { id: string; posts: Post[] }) {}
}

export type SubredditActions =
  | InitializeSubreddits
  | LoadSubredditPosts
  | LoadSubredditPostsSuccess;
