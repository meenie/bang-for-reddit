import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import * as uuidv4 from 'uuid/v4';

import * as fromDeck from '../reducers'
import * as DeckActions from '../actions/deck';
import { Deck } from '../models/deck';

@Component({
  selector: 'bfr-view-deck',
  templateUrl: './view-deck.component.html',
  styleUrls: ['./view-deck.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ViewDeckComponent {
  subredditIds$: Observable<string[]>;
  decks$: Observable<Deck[]>;
  actionsSubscription: Subscription;

  public deckName: string;
  public deckSubreddits: string;
  public decks: Deck[] = [
    {
      id: 'default',
      name: 'Default Deck',
      subredditIds: ['all', 'politics']
    },
    {
      id: 'basketball',
      name: 'Basketball Deck',
      subredditIds: ['nba', 'warriors', 'bostonceltics']
    }
  ]

  constructor(private _store: Store<fromDeck.State>, private route: ActivatedRoute, private router: Router) {
    _store.dispatch(new DeckActions.Add(this.decks[0]));
    _store.dispatch(new DeckActions.Add(this.decks[1]));

    this.actionsSubscription = route.params
      .map(params => new DeckActions.Activate(params.id || 'default'))
      .subscribe(_store);
  }

  onSubmit(form) {
    const id = uuidv4();

    this._store.dispatch(new DeckActions.Add({
      id,
      name: this.deckName,
      subredditIds: this.deckSubreddits.split(',')
    }));

    form.reset();

    this.router.navigateByUrl(`/d/${id}`);
  }

  ngOnInit() {
    this.subredditIds$ = this._store.select(fromDeck.selectCurrentDeck).map(deck => deck ? deck.subredditIds : []);
    this.decks$ = this._store.select(fromDeck.selecAllDecks);
  }

  ngOnDestroy() {
    this.actionsSubscription.unsubscribe();
  }
}
