import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import * as fromDeck from '../reducers'
import * as DeckActions from '../actions/deck';
import { Deck } from '../models/deck';

@Component({
  selector: 'bfr-view-deck',
  templateUrl: './view-deck.component.html'
})
export class ViewDeckComponent {
  subredditIds$: Observable<string[]>;
  actionsSubscription: Subscription;

  constructor(private _store: Store<fromDeck.State>, route: ActivatedRoute) {
    let defaultDeck: Deck = {
      id: 'default',
      subredditIds: ['all', 'politics']
    }

    let basketballDeck: Deck = {
      id: 'basketball',
      subredditIds: ['nba', 'warriors', 'bostonceltics']
    }

    _store.dispatch(new DeckActions.Add(defaultDeck));
    _store.dispatch(new DeckActions.Add(basketballDeck));

    this.actionsSubscription = route.params
      .map(params => new DeckActions.Activate(params.id || 'default'))
      .subscribe(_store);
  }

  ngOnInit() {
    this.subredditIds$ = this._store.select(fromDeck.selectCurrentDeck).map(deck => deck.subredditIds);
  }

  ngOnDestroy() {
    this.actionsSubscription.unsubscribe();
  }
}
