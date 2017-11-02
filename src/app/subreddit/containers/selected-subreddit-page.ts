import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as fromSubreddit from '../reducers';
import { State as MetadataState } from '../reducers/metadata';
import { Post } from '../models/post';

@Component({
  selector: 'bfr-selected-subreddit-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <bfr-subreddit-detail
      [id]="id$ | async"
      [posts]="posts$ | async"
      [loaded]="loaded$ | async"
      [loading]="loading$ | async">
    </bfr-subreddit-detail>
  `,
})
export class SelectedSubredditPage {
  id$: Observable<string>;
  posts$: Observable<Post[]>;
  loaded$: Observable<boolean>;
  loading$: Observable<boolean>;

  constructor(private store: Store<fromSubreddit.State>) {
    this.id$ = store.select(fromSubreddit.getSubredditId);
    this.loading$ = store.select(fromSubreddit.getSubredditLoading);
    this.loaded$ = store.select(fromSubreddit.getSubredditLoaded);
    this.posts$ = store.select(fromSubreddit.getAllPosts);
  }
}