import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as fromDeck from '../reducers'
import * as DeckActions from '../actions/deck';
import { Deck } from '../models/deck';

@Component({
  selector: 'bfr-view-deck',
  templateUrl: './view-deck.component.html'
})
export class ViewDeckComponent {
  subredditIds$: Observable<string[]>;

  constructor(private store: Store<fromDeck.State>) {
    let deck: Deck = {
      id: 'default', 
      subredditIds: ['all', 'politics', 'warriors']
    }

    store.dispatch(new DeckActions.Add(deck));
    store.dispatch(new DeckActions.Activate('default'));

    setTimeout(() => {
      let updatedDeck = Object.assign({}, deck);
      updatedDeck.subredditIds = [...updatedDeck.subredditIds, 'nba']
      store.dispatch(new DeckActions.Update({id: 'default', changes: updatedDeck}));
    }, 1000);
  }

  ngOnInit() {
    this.subredditIds$ = this.store.select(fromDeck.selectCurrentDeckSubredditIds);
  }
}
