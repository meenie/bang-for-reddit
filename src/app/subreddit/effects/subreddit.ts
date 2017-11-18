import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/toArray';
import 'rxjs/add/operator/do';
import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { defer } from 'rxjs/observable/defer';
import { of } from 'rxjs/observable/of';

import { RedditService } from '../../core/services/reddit';

import * as SubredditActions from '../actions/subreddit';
import { Subreddit } from '../models/subreddit';
import { Post } from '../models/post';

@Injectable()
export class SubredditEffects {

  @Effect()
  loadSubreddit$: Observable<Action> = this.actions$
    .ofType<SubredditActions.Load>(SubredditActions.LOAD)
    .concatMap(action =>
      this.reddit
        .getSubreddit(action.payload)
        .map(subreddit => {
          if (! subreddit) {
            return {
              subreddit: {
                id: action.payload.id,
                type: action.payload.type,
              },
              posts: []
            }
          }

          return {
            subreddit: {
              id: action.payload.id,
              type: action.payload.type,
            },
            posts: subreddit.data.children.filter(post => {
              const thirtyMinsAgo = Math.round((new Date()).getTime() / 1000) - (60 * 60);
              return post.data.created_utc > thirtyMinsAgo && post.data.subreddit != 'The_Donald';
            }).map(post => {
              return {
                id: post.data.id,
                title: post.data.title,
                url: post.data.url,
                score: post.data.score,
                subreddit: post.data.subreddit,
                author: post.data.author,
                thumbnail: post.data.thumbnail.slice(0, 4) == 'http' ? post.data.thumbnail : '',
                created: new Date(post.data.created_utc * 1000),
                commentsUrl: `https://www.reddit.com${post.data.permalink}`,
                numComments: post.data.num_comments
              }
            })
          }
        })
        .map((subreddit: {subreddit: Subreddit, posts: Post[]}) => new SubredditActions.LoadSuccess(subreddit))
    );

  constructor(private actions$: Actions, private reddit: RedditService) {}
}
