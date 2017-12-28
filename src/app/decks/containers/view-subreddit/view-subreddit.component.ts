import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  OnInit,
  OnDestroy
} from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute } from '@angular/router';

import { Store } from '@ngrx/store';

import { Observable } from 'rxjs/Observable';
import { timer } from 'rxjs/observable/timer';

import { map, distinctUntilChanged, switchMap } from 'rxjs/operators';

import { environment } from '../../../../environments/environment';
import * as fromStore from '../../store';
import * as fromSubredditActions from '../../store/actions/subreddit.action';
import { Subreddit } from '../../models/subreddit.model';
import { Post } from '../../models/post.model';

@Component({
  selector: 'bfr-view-subreddit',
  templateUrl: './view-subreddit.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ViewSubredditComponent implements OnInit, OnDestroy {
  @Input() subredditId: string;
  @Input() deckId: string;
  @Output()
  setType = new EventEmitter<{
    id: string;
    subredditId: string;
    type: string;
  }>();

  subredditRefresher$: Subscription;
  posts$: Observable<Post[]>;
  subreddit$: Observable<Subreddit>;
  settings$: Observable<{ type: string }>;

  constructor(private store: Store<fromStore.State>) {}

  onSetType(event: { id: string; type: string }) {
    this.setType.emit({
      id: this.deckId,
      subredditId: event.id,
      type: event.type
    });
  }

  ngOnInit() {
    this.store.dispatch(
      new fromSubredditActions.InitializeSubreddit(this.subredditId)
    );

    this.subreddit$ = this.store.select(
      fromStore.getSubreddit(this.subredditId)
    );
    this.settings$ = this.store.select(
      fromStore.getSubredditSettings(this.subredditId)
    );
    this.subredditRefresher$ = this.settings$
      .pipe(
        distinctUntilChanged(),
        switchMap(settings =>
          timer(0, environment.production ? 5000 : 60000).pipe(
            map(
              () =>
                new fromSubredditActions.LoadSubredditPosts({
                  id: this.subredditId,
                  type: settings.type
                })
            )
          )
        )
      )
      .subscribe(this.store);

    this.posts$ = this.store.select(
      fromStore.getSubredditPostsSorted(this.subredditId)
    );
  }

  ngOnDestroy() {
    this.subredditRefresher$.unsubscribe();
  }
}
