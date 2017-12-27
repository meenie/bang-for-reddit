import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  OnInit,
  OnDestroy
} from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs/Subscription'
import { ActivatedRoute } from '@angular/router';

import { Store } from '@ngrx/store';

import { Observable } from 'rxjs/Observable';
import { timer } from 'rxjs/observable/timer';

import { map, distinctUntilChanged, switchMap } from 'rxjs/operators';

import * as fromStore from '../../store';
import * as fromSubreddit from '../../store/actions/subreddit.action';
import { Subreddit } from '../../models/subreddit.model';
import { Post } from '../../models/post.model';
import { withLatestFrom } from 'rxjs/operators/withLatestFrom';

@Component({
  selector: 'bfr-view-subreddit',
  templateUrl: './view-subreddit.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ViewSubredditComponent implements OnInit, OnDestroy {
  @Input() subredditId: string;
  @Input() deckId: string;
  @Output() setType = new EventEmitter<{id: string, subredditId: string, type: string}>();
  @Output() setSort = new EventEmitter<{id: string, subredditId: string, sort: string}>();

  subredditRefresher$: Subscription;
  posts$: Observable<Post[]>;
  subreddit$: Observable<Subreddit>;
  settings$: Observable<{ type: string; sort: string; }>;

  constructor(private store: Store<fromStore.State>) {}

  onSetType(event: {id: string, type: string}) {
    this.setType.emit({
      id: this.deckId,
      subredditId: event.id,
      type: event.type
    });
  }

  onSetSort(event: {id: string, sort: string}) {
    this.setSort.emit({
      id: this.deckId,
      subredditId: event.id,
      sort: event.sort
    });
  }

  ngOnInit() {
    this.store.dispatch(new fromSubreddit.InitializeSubreddit(this.subredditId))
    this.subredditRefresher$ = this.store.select(fromStore.getSubredditSettings(this.subredditId)).pipe(
      distinctUntilChanged(),
      switchMap(settings => timer(0, 5000)
        .pipe(
          map(() => new fromSubreddit.LoadSubredditPosts({id: this.subredditId, type: settings.type, sort: settings.sort}))
        )
      )
    )
    .subscribe(this.store)

    this.subreddit$ = this.store.select(fromStore.getSubreddit(this.subredditId));
    this.settings$ = this.store.select(fromStore.getSubredditSettings(this.subredditId));
    this.posts$ = this.store.select(fromStore.getSubredditPosts(this.subredditId)).pipe(
      withLatestFrom(this.settings$),
      map(([posts, settings]) => {
        if (settings.type == 'new') {
          posts = posts.sort((a, b) => b.created.getTime() - a.created.getTime())
        }

        if (settings.type == 'rising') {
          posts = posts.sort((a, b) => b.score - a.score)
        }

        return posts;
      })
    );
  }

  ngOnDestroy() {
    this.subredditRefresher$.unsubscribe();
  }
}
