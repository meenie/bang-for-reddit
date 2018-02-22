import {
  Component,
  ChangeDetectionStrategy,
  Input,
  OnInit,
  OnDestroy
} from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute } from '@angular/router';

import { Store } from '@ngrx/store';

import { Observable } from 'rxjs/Observable';
import { timer } from 'rxjs/observable/timer';
import { combineLatest } from 'rxjs/observable/combineLatest';

import {
  map,
  distinctUntilChanged,
  switchMap,
  withLatestFrom,
  tap,
  filter
} from 'rxjs/operators';

import * as fromStore from '../../store';
import * as fromSubreddit from '../../store/actions/subreddit.action';
import * as fromDeck from '../../store/actions/deck.action';
import { Subreddit } from '../../models/subreddit.model';
import { Post } from '../../models/post.model';
import { RedditService } from '../../../core/services/reddit.service';
import * as fromCoreStore from '../../../core/store';

@Component({
  selector: 'bfr-view-subreddit',
  templateUrl: './view-subreddit.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ViewSubredditComponent implements OnInit, OnDestroy {
  @Input() subredditId: string;

  subredditRefresher$: Subscription;
  posts$: Observable<Post[]>;
  subreddit$: Observable<Subreddit>;
  settings$: Observable<{ type: string }>;

  constructor(private store: Store<fromStore.State>, private reddit: RedditService) {}

  onSetType(event: { subredditId: string; type: string }) {
    this.store.dispatch(new fromDeck.SetDeckSubredditType(event));
  }

  onRemoveSubreddit(subredditId: string) {
    this.store.dispatch(new fromDeck.RemvoveSubredditFromDeck({ subredditId }));
  }

  ngOnInit() {
    this.subreddit$ = this.store
      .select(fromStore.getSubredditEntities)
      .pipe(map(subreddits => subreddits[this.subredditId]));
    this.settings$ = this.store
      .select(fromStore.getCurrentDeckSubredditSettings)
      .pipe(
        withLatestFrom(this.subreddit$),
        filter(([settings, subreddit]) => !! settings[subreddit.id]),
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

    this.subredditRefresher$ = combineLatest(this.settings$, this.store.select(fromCoreStore.getIsIdle))
      .pipe(
        filter(([settings, isIdle]) => !! settings),
        distinctUntilChanged(),
        tap(([settings, isIdle]) => this.store.dispatch(
          new fromSubreddit.LoadSubredditPosts({id: this.subredditId, type: settings.type})
        )),
        switchMap(([settings, isIdle]) =>
          timer(0, 5000).pipe(
            filter(() => ! isIdle),
            switchMap(
              () =>
                this.reddit.getPosts({
                  id: this.subredditId,
                  type: settings.type
                }).pipe(
                  map(
                    posts =>
                      new fromSubreddit.LoadSubredditPostsSuccess({
                        id: this.subredditId,
                        posts
                      })
                  )
                )
            )
          )
        )
      )
      .subscribe(this.store);
  }

  ngOnDestroy() {
    this.subredditRefresher$.unsubscribe();
  }
}
