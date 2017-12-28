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

import {
  map,
  distinctUntilChanged,
  switchMap,
  withLatestFrom
} from 'rxjs/operators';

import * as fromStore from '../../store';
import * as fromSubreddit from '../../store/actions/subreddit.action';
import { Subreddit } from '../../models/subreddit.model';
import { Post } from '../../models/post.model';
import { environment } from '../../../../environments/environment';

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
    this.subredditRefresher$ = this.store
      .select(fromStore.getCurrentDeckSubredditSettings)
      .pipe(
        map(settings => settings[this.subredditId]),
        distinctUntilChanged(),
        switchMap(settings =>
          timer(0, environment.production ? 5000 : 60000).pipe(
            map(
              () =>
                new fromSubreddit.LoadSubredditPosts({
                  id: this.subredditId,
                  type: settings.type
                })
            )
          )
        )
      )
      .subscribe(this.store);

    this.subreddit$ = this.store
      .select(fromStore.getSubredditEntities)
      .pipe(map(subreddits => subreddits[this.subredditId]));
    this.settings$ = this.store
      .select(fromStore.getCurrentDeckSubredditSettings)
      .pipe(
        withLatestFrom(this.subreddit$),
        map(([settings, subreddit]) => settings[subreddit.id])
      );
    this.posts$ = this.store.select(fromStore.getAllPosts).pipe(
      withLatestFrom(this.subreddit$),
      map(([allPosts, subreddit]) =>
        allPosts.filter(post => subreddit.postIds.includes(post.id))
      ),
      withLatestFrom(this.settings$),
      map(([posts, settings]) => {
        if (settings.type == 'new') {
          posts = posts.sort(
            (a, b) => b.created.getTime() - a.created.getTime()
          );
        }

        if (settings.type == 'rising') {
          posts = posts.sort((a, b) => b.score - a.score);
        }

        return posts;
      })
    );
  }

  ngOnDestroy() {
    this.subredditRefresher$.unsubscribe();
  }
}
