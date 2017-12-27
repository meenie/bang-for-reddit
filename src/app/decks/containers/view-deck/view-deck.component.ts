import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { map } from 'rxjs/operators';

import * as fromStore from '../../store'
import * as fromDeck from '../../store/actions/deck.action';
import { Deck } from '../../models/deck.model';
import { Subreddit } from '../../models/subreddit.model';

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
  // HACK
  currentDeckId: string;
  paramsSubscription: Subscription;
  decksPersistSubscription: Subscription;

  constructor(private store: Store<fromStore.State>, private route: ActivatedRoute, private router: Router) {
    this.paramsSubscription = route.params.pipe(
      map(params => {
        this.currentDeckId = params.id;
        return new fromDeck.ActivateDeck(params.id)
      })
    ).subscribe(store);
    this.decksPersistSubscription = store.select(fromStore.getDecksState).pipe(
      map(decks => new fromDeck.PersistDeck(decks))
    ).subscribe(store);

    this.currentSubredditIds$ = store.select(fromStore.getCurrentDeckSubredditIds);
    this.decks$ = store.select(fromStore.getAllDecks);
    this.currentDeckId$ = store.select(fromStore.getCurrentDeckId);
  }

  onAddDeck(deck: Deck) {
    this.store.dispatch(new fromDeck.AddDeck(deck));
    this.router.navigateByUrl(`/d/${deck.id}`);
  }

  onSetType(event: {id: string, subredditId: string, type: string}) {
    this.store.dispatch(new fromDeck.SetDeckSubredditType(event));
  }

  onSetSort(event: {id: string, subredditId: string, sort: string}) {
    this.store.dispatch(new fromDeck.SetDeckSubredditSort(event));
  }

  onRemoveDeck(event: string) {
    this.store.dispatch(new fromDeck.RemoveDeck(event));
    if (this.currentDeckId == event) {
      this.router.navigateByUrl('/d/default');
    }
  }

  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
    this.decksPersistSubscription.unsubscribe();
  }
}
