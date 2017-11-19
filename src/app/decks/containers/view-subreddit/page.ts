import { 
  Component, 
  ChangeDetectionStrategy, 
  Input, 
  Output, 
  OnInit, 
  OnDestroy,
  EventEmitter 
} from '@angular/core';
import { Subscription } from 'rxjs/Subscription'
import { ActivatedRoute } from '@angular/router';

import { Store } from '@ngrx/store';

import { Observable } from 'rxjs/Observable';
import { timer } from 'rxjs/observable/timer';

import { map, distinctUntilChanged, switchMap } from 'rxjs/operators';

import * as fromSubreddit from '../../reducers';
import * as SubredditActions from '../../actions/subreddit';
import { Subreddit } from '../../models/subreddit';
import { Post } from '../../models/post';
import { withLatestFrom } from 'rxjs/operators/withLatestFrom';

@Component({
  selector: 'bfr-view-subreddit-page',
  templateUrl: './page.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ViewSubredditPage implements OnInit, OnDestroy {
  @Input() subredditId: string;
  @Input() deckId: string;
  @Output() setType = new EventEmitter<{id: string, subredditId: string, type: string}>();
  @Output() setSort = new EventEmitter<{id: string, subredditId: string, sort: string}>();
  
  subredditRefresher$: Subscription;
  posts$: Observable<Post[]>;
  subreddit$: Observable<Subreddit>;
  settings$: Observable<{ type: string; sort: string; }>;

  constructor(private _store: Store<fromSubreddit.State>) {}

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
    this._store.dispatch(new SubredditActions.Initialize(this.subredditId))
    this.subredditRefresher$ = this._store.select(fromSubreddit.selectSubredditSettings(this.subredditId)).pipe(
      distinctUntilChanged(),
      switchMap(settings => timer(0, 5000)
        .pipe(
          map(() => new SubredditActions.LoadPosts({id: this.subredditId, type: settings.type, sort: settings.sort}))
        )
      )
    )
    .subscribe(this._store)

    this.subreddit$ = this._store.select(fromSubreddit.selectSubreddit(this.subredditId));
    this.settings$ = this._store.select(fromSubreddit.selectSubredditSettings(this.subredditId));
    this.posts$ = this._store.select(fromSubreddit.selectSubredditPosts(this.subredditId)).pipe(
      withLatestFrom(this.settings$),
      map(([posts, settings]) => {
        // Only want to ween out old rising posts
        if (settings.type == 'rising') {
          posts = posts.filter(post => {
            const sixtyMinutesAgo = Math.round((new Date()).getTime()) - (60 * 60 * 1000);
            return post.created.getTime() > sixtyMinutesAgo;
          })
        }

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
