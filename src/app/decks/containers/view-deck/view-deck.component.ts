import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromStore from '../../store';
import * as fromDeck from '../../store/actions/deck.action';
import { Deck } from '../../models/deck.model';
import { FormGroup } from '@angular/forms';

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
  subredditToAdd: string;

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

  onSubmit(form: FormGroup) {
    const subredditId = this.subredditToAdd.trim();
    this.store.dispatch(new fromDeck.AddSubredditToDeck({ subredditId }));
    form.reset();
  }
}
