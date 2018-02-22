import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { filter, map, tap, withLatestFrom } from 'rxjs/operators';

import { LocalStorageService } from '../../../core/services/local-storage.service';

import * as fromStore from '../../../core/store';
import * as fromDeckSelectors from '../selectors/decks.selectors';
import * as fromDeck from '../actions/deck.action';
import * as fromRouter from '../../../core/store/actions/router.action';

@Injectable()
export class DeckEffects {
  @Effect({ dispatch: false })
  persistDecks$ = this.actions$
    .ofType<
      fromDeck.AddDeck | fromDeck.RemoveDeck | fromDeck.SetDeckSubredditType |
      fromDeck.AddSubredditToDeck | fromDeck.RemvoveSubredditFromDeck
    >(
      fromDeck.ADD_DECK, fromDeck.REMOVE_DECK, fromDeck.SET_DECK_SUBREDDIT_TYPE,
      fromDeck.ADD_SUBREDDIT_TO_DECK, fromDeck.REMOVE_SUBREDDIT_FROM_DECK
    )
    .pipe(
      withLatestFrom(this.store.select(fromDeckSelectors.getDecksState)),
      tap(([_, decksState]) =>
        this.localStorage.setItem(fromDeck.DECKS_KEY, decksState)
      )
    );

  @Effect()
  removeDeckRedirect$: Observable<Action> = this.actions$
    .ofType<fromDeck.RemoveDeck>(fromDeck.REMOVE_DECK)
    .pipe(
      map(action => action.payload),
      withLatestFrom(this.store.select(fromDeckSelectors.getCurrentDeckId)),
      filter(([deckId, currentDeckId]) => deckId === currentDeckId),
      map(
        ([deckId, currentDeckId]) =>
          new fromRouter.Go({ path: ['/d', 'default'] })
      )
    );

  @Effect()
  addDeckRedirect$: Observable<Action> = this.actions$
    .ofType<fromDeck.AddDeck>(fromDeck.ADD_DECK)
    .pipe(
      map(action => new fromRouter.Go({ path: ['/d', action.payload.id] }))
    );

  constructor(
    private actions$: Actions,
    private localStorage: LocalStorageService,
    private store: Store<fromStore.State>
  ) {}
}
