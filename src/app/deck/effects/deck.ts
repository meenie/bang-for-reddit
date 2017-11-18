import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { tap, map } from 'rxjs/operators';

import { LocalStorageService } from '../../core/services/local-storage';

import * as DeckActions from '../actions/deck';
import { Deck } from '../models/deck';
import { of } from 'rxjs/observable/of';

@Injectable()
export class DeckEffects {

  @Effect()
  persistDecks$: Observable<Action> = this.actions$
    .ofType<DeckActions.Persist>(DeckActions.PERSIST)
    .pipe(
      tap(action => this.localStorage.setItem(DeckActions.DECKS_KEY, action.payload)),
      map(() => new DeckActions.Persisted())
    )

  constructor(private actions$: Actions, private localStorage: LocalStorageService) {}
}
