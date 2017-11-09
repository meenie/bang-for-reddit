import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as fromSubreddit from '../reducers';

import { Post } from '../models/post';
import { Subreddit } from '../models/subreddit';

@Component({
  selector: 'bfr-selected-subreddit-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <bfr-subreddit-detail
      [subreddit]="subreddit$ | async">
    </bfr-subreddit-detail>
  `,
})
export class SelectedSubredditPage {
  @Input() subreddit;

  subreddit$: Observable<{subreddit: Subreddit, posts: Post[]}>

  constructor(private _store: Store<fromSubreddit.State>) {}

  ngOnInit() {
    this.subreddit$ = this._store.select(fromSubreddit.selectSubredditWithPosts(this.subreddit));
  }
}
