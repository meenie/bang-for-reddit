import 'rxjs/add/observable/timer';
import { Component, ChangeDetectionStrategy, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription'
import { ActivatedRoute } from '@angular/router';

import { Store } from '@ngrx/store';

import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

import * as fromSubreddit from '../reducers';
import * as SubredditActions from '../actions/subreddit';
import { Subreddit } from '../models/subreddit';
import { Post } from '../models/post';

@Component({
  selector: 'bfr-view-subreddit-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <bfr-subreddit-detail
      [subreddit]="subreddit$ | async">
    </bfr-subreddit-detail>
  `
})
export class ViewSubredditPageComponent {
  @Input() subredditId: string;

  subredditRefresher$: Subscription;
  subreddit$: Observable<{subreddit: Subreddit, posts: Post[]}>;
  private subreddit: Subreddit;

  constructor(private _store: Store<fromSubreddit.State>) {}

  ngOnInit() {
    const subreddit = {
      id: this.subredditId,
      type: 'rising',
      postIds: [],
      loading: true,
      loaded: false
    };

    this._store.dispatch(new SubredditActions.Initialize(subreddit))
    this.subredditRefresher$ = Observable
      .timer(0, 5000)
      .pipe(
        map(() => new SubredditActions.LoadPosts(subreddit))
      ).subscribe(this._store)

    this.subreddit$ = this._store.select(fromSubreddit.selectSubredditWithPosts(this.subredditId)).pipe(
      map(subreddit => {
        subreddit.posts = subreddit.posts.filter(post => {
          const sixtyMinutesAgo = Math.round((new Date()).getTime()) - (60 * 60 * 1000);
          return post.created.getTime() > sixtyMinutesAgo;
        })
        return subreddit
      })
    );
  }

  ngOnDestroy() {
    this.subredditRefresher$.unsubscribe();
  }
}
