import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { concatMap, map } from 'rxjs/operators';

import { RedditService } from '../../../core/services/reddit.service';

import * as SubredditActions from '../actions/subreddit.action';

@Injectable()
export class SubredditEffects {

  @Effect()
  loadSubreddit$: Observable<Action> = this.actions$
    .ofType<SubredditActions.LoadSubredditPosts>(SubredditActions.LOAD_SUBREDDIT_POSTS)
    .pipe(
      concatMap(action => this.reddit
        .getPosts(action.payload)
        .pipe(
          map(posts => new SubredditActions.LoadSubredditPostsSuccess({id: action.payload.id, posts}))
        )
      )
    )

  constructor(private actions$: Actions, private reddit: RedditService) {}
}
