import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { tap } from 'rxjs/operators';

import { LocalStorageService } from '../../core/services/local-storage';
import * as DeckActions from '../actions/deck';

@Injectable()
export class DeckEffects {

  @Effect({ dispatch: false })
  persistDecks$: Observable<Action> = this.actions$
    .ofType<DeckActions.Persist>(DeckActions.PERSIST)
    .pipe(
      tap((action: DeckActions.Persist) => this.localStorage.setItem(DeckActions.DECKS_KEY, action.payload))
    )

  constructor(private actions$: Actions, private localStorage: LocalStorageService) {}
}
