import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as fromStore from '../../store';
import * as fromDeck from '../../store/actions/deck.action';
import { Deck } from '../../models/deck.model';

@Component({
  selector: 'bfr-view-deck',
  templateUrl: './view-deck.component.html',
  styleUrls: ['./view-deck.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ViewDeckComponent {
  currentSubredditIds$: Observable<string[]>;
  decks$: Observable<Deck[]>;
  currentDeckId$: Observable<string>;

  constructor(private store: Store<fromStore.State>) {
    this.currentSubredditIds$ = store.select(
      fromStore.getCurrentDeckSubredditIds
    );
    this.decks$ = store.select(fromStore.getAllDecks);
    this.currentDeckId$ = store.select(fromStore.getCurrentDeckId);
  }

  onAddDeck(deck: Deck) {
    this.store.dispatch(new fromDeck.AddDeck(deck));
  }

  onRemoveDeck(event: string) {
    this.store.dispatch(new fromDeck.RemoveDeck(event));
  }
}
