import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { map } from 'rxjs/operators';

import * as fromDeck from '../reducers'
import * as DeckActions from '../actions/deck';
import { Deck } from '../models/deck';

@Component({
  selector: 'bfr-view-deck',
  templateUrl: './view-deck.component.html',
  styleUrls: ['./view-deck.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ViewDeckComponent {
  currentSubredditIds$: Observable<string[]>;
  decks$: Observable<Deck[]>;
  paramsSubscription: Subscription;

  constructor(private _store: Store<fromDeck.State>, route: ActivatedRoute, private router: Router) {
    this.paramsSubscription = route.params
      .pipe(
        map(params => new DeckActions.Activate(params.id))
      )
      .subscribe(_store);

    this.currentSubredditIds$ = _store.select(fromDeck.selectCurrentDeckSubredditIds);
    this.decks$ = _store.select(fromDeck.selecAllDecks);
  }

  onAddDeck(deck: Deck) {
    this._store.dispatch(new DeckActions.Add(deck));
    this.router.navigateByUrl(`/d/${deck.id}`);
  }

  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
  }
}
