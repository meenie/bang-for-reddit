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

@Injectable()
export class SubredditEffects {

  @Effect()
  loadSubreddit$: Observable<Action> = this.actions$
    .ofType<SubredditActions.Load>(SubredditActions.LOAD)
    .switchMap(action =>
      this.reddit
        .getSubreddit(action.payload)
        .map(subreddit => {
          return {
            id: action.payload.subreddit,
            type: action.payload.type,
            posts: subreddit.data.children.map(post => {
              return {
                id: post.data.id,
                title: post.data.title,
                url: post.data.url,
                score: post.data.score,
                created: new Date(post.data.created * 1000),
                commentsUrl: `https://www.reddit.com${post.data.permalink}`,
                numComments: post.data.num_comments
              }
            })
          }
        })
        .map((subreddit: Subreddit) => new SubredditActions.LoadSuccess(subreddit))
    );

  constructor(private actions$: Actions, private reddit: RedditService) {}
}