import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { map } from 'rxjs/operators';

import * as reducers from '../../reducers'
import * as DeckActions from '../../actions/deck';
import { Deck } from '../../models/deck';
import { Subreddit } from '../../models/subreddit';

@Component({
  selector: 'bfr-view-deck-page',
  templateUrl: './page.html',
  styleUrls: ['./page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ViewDeckPage {
  currentSubredditIds$: Observable<string[]>;
  decks$: Observable<Deck[]>;
  currentDeckId$: Observable<string>;
  paramsSubscription: Subscription;
  decksPersistSubscription: Subscription;

  constructor(private _store: Store<reducers.State>, route: ActivatedRoute, private router: Router) {
    this.paramsSubscription = route.params.pipe(
      map(params => new DeckActions.Activate(params.id))
    ).subscribe(_store);
    this.decksPersistSubscription = _store.select(reducers.selectDecksState).pipe(
      map(decks => new DeckActions.Persist(decks))
    ).subscribe(_store);

    this.currentSubredditIds$ = _store.select(reducers.selectCurrentDeckSubredditIds);
    this.decks$ = _store.select(reducers.selecAllDecks);
    this.currentDeckId$ = _store.select(reducers.selectCurrentDeckId);
  }

  onAddDeck(deck: Deck) {
    this._store.dispatch(new DeckActions.Add(deck));
    this.router.navigateByUrl(`/d/${deck.id}`);
  }

  onSetType(event: {id: string, subredditId: string, type: string}) {
    this._store.dispatch(new DeckActions.SetType(event));
  }

  onSetSort(event: {id: string, subredditId: string, sort: string}) {
    this._store.dispatch(new DeckActions.SetSort(event));
  }

  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
    this.decksPersistSubscription.unsubscribe();
  }
}
