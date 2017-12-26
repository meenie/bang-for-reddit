import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { tap } from 'rxjs/operators';

import { LocalStorageService } from '../../../core/services/local-storage.service';
import * as DeckActions from '../actions/deck.action';

@Injectable()
export class DeckEffects {

  @Effect({ dispatch: false })
  persistDecks$: Observable<Action> = this.actions$
    .ofType<DeckActions.PersistDeck>(DeckActions.PERSIST_DECK)
    .pipe(
      tap((action: DeckActions.PersistDeck) => this.localStorage.setItem(DeckActions.DECKS_KEY, action.payload))
    )

  constructor(private actions$: Actions, private localStorage: LocalStorageService) {}
}
