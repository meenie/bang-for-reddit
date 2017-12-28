import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { concatMap, map } from 'rxjs/operators';

import { RedditService } from '../../../core/services/reddit.service';

import * as subredditActions from '../actions/subreddit.action';
import * as deckActions from '../actions/deck.action';
import * as deckSelectors from '../selectors/decks.selectors';
import * as fromStore from '../../../core/store';
import { withLatestFrom } from 'rxjs/operators/withLatestFrom';

@Injectable()
export class SubredditEffects {
  @Effect()
  loadSubreddits$: Observable<Action> = this.actions$
    .ofType<deckActions.ActivateDeck>(deckActions.ACTIVATE_DECK)
    .pipe(
      withLatestFrom(
        this.store.select(deckSelectors.getCurrentDeckSubredditIds)
      ),
      map(
        ([_, subredditIds]) =>
          new subredditActions.InitializeSubreddits(subredditIds)
      )
    );

  @Effect()
  loadSubredditPosts$: Observable<Action> = this.actions$
    .ofType<subredditActions.LoadSubredditPosts>(
      subredditActions.LOAD_SUBREDDIT_POSTS
    )
    .pipe(
      concatMap(action =>
        this.reddit.getPosts(action.payload).pipe(
          map(
            posts =>
              new subredditActions.LoadSubredditPostsSuccess({
                id: action.payload.id,
                posts
              })
          )
        )
      )
    );

  constructor(
    private actions$: Actions,
    private reddit: RedditService,
    private store: Store<fromStore.State>
  ) {}
}
