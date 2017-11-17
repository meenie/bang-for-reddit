import { Component, ChangeDetectionStrategy, HostListener } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
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
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('collapse', [
      state('open', style({
        overflow: 'hidden',
        height: '135px',
      })),
      state('closed',   style({
        opacity: '0',
        overflow: 'hidden',
        height: '0px'
      })),
      transition('closed => open', animate('200ms ease-in-out')),
      transition('open => closed', animate('200ms ease-in-out'))
    ])
  ]
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
  public navbarCollapsed: boolean = true;
  _isNavbarCollapsedAnim = 'closed';

  constructor(private _store: Store<fromDeck.State>, private route: ActivatedRoute, private router: Router) {
    _store.dispatch(new DeckActions.Add(this.decks[0]));
    _store.dispatch(new DeckActions.Add(this.decks[1]));

    this.actionsSubscription = route.params
      .map(params => new DeckActions.Activate(params.id || 'default'))
      .subscribe(_store);
  }

  toggleNavbar(): void {
    if(this.navbarCollapsed){
      this._isNavbarCollapsedAnim = 'open';
      this.navbarCollapsed = false;
    } else {
      this._isNavbarCollapsedAnim = 'closed';
      this.navbarCollapsed = true;
    }
  }

  get isNavbarCollapsedAnim() : string {
    return this._isNavbarCollapsedAnim;
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
