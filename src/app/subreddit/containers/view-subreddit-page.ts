import 'rxjs/add/operator/take';
import { Component, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription'
import { ActivatedRoute } from '@angular/router';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as fromSubreddit from '../reducers';
import * as SubredditActions from '../actions/subreddit';


interface AppState {
  counter: number;
}

@Component({
  selector: 'bfr-subreddits-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <bfr-selected-subreddit-page></bfr-selected-subreddit-page>
  `
})
export class ViewSubredditPageComponent implements OnDestroy {
  actionsSubscription: Subscription;

  constructor(store: Store<fromSubreddit.State>, route: ActivatedRoute) {
    this.actionsSubscription = route.params
      .map(params => new SubredditActions.Load({
        subreddit: params.subreddit,
        type: params.type
      }))
      .subscribe(store);
  }

  ngOnDestroy() {
    this.actionsSubscription.unsubscribe();
  }
}