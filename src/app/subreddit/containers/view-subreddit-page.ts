import 'rxjs/add/operator/take';
import { Component, ChangeDetectionStrategy, Input, OnInit } from '@angular/core';
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
  selector: 'bfr-view-subreddit-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <bfr-selected-subreddit-page></bfr-selected-subreddit-page>
  `
})
export class ViewSubredditPageComponent implements OnInit {
  @Input() subreddit;

  actionsSubscription: Subscription;

  constructor(private store: Store<fromSubreddit.State>) {}

  ngOnInit() {
    this.store.dispatch(new SubredditActions.Load({
      subreddit: this.subreddit,
      type: ''
    }))
  }
}
