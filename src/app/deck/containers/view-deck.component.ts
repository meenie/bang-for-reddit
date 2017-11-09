import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as fromDeck from '../reducers'
import * as SubredditActions from '../actions/subreddit';
import { Subreddit } from '../models/subreddit';

@Component({
  selector: 'bfr-view-deck',
  templateUrl: './view-deck.component.html'
})
export class ViewDeckComponent {
  subreddits$: Observable<Subreddit[]>;

  constructor(private store: Store<fromDeck.State>) {
    this.subreddits$ = store.select(fromDeck.getAllSubreddits);

    store.dispatch(new SubredditActions.LoadSuccess({id: 'all', type: ''}));
    store.dispatch(new SubredditActions.LoadSuccess({id: 'politics', type: 'top'}));
    store.dispatch(new SubredditActions.LoadSuccess({id: 'warriors', type: 'rising'}));
  }
}
