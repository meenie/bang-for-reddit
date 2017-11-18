import 'rxjs/add/observable/timer';
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
    <bfr-selected-subreddit-page [subreddit]="subreddit"></bfr-selected-subreddit-page>
  `
})
export class ViewSubredditPageComponent {
  @Input() subreddit: string;

  subredditRefresher$: Subscription;

  constructor(private _store: Store<fromSubreddit.State>) {}

  ngOnInit() {
    this._store.dispatch(new SubredditActions.Load({
      id: this.subreddit,
      type: '',
      postIds: [],
      loading: true,
      loaded: false
    }))

    this.subredditRefresher$ = Observable.timer(5000, 5000).subscribe(() => {
      this._store.dispatch(new SubredditActions.Load({
        id: this.subreddit,
        type: this.subreddit == 'politics' ? 'rising' : '',
        postIds: [],
        loading: true,
        loaded: false
      }))
    })
  }

  ngOnDestroy() {
    this.subredditRefresher$.unsubscribe();
  }
}
