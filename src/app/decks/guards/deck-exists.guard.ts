import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';

import { Store } from '@ngrx/store';

import { Observable } from 'rxjs/Observable';
import { tap, map, filter, take, switchMap } from 'rxjs/operators';
import * as fromStore from '../store';
import * as fromCoreStore from '../../core/store';

import { Deck } from '../models/deck.model';

@Injectable()
export class DeckExistsGuard implements CanActivate {
  constructor(private store: Store<fromStore.State>) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.checkStore(route.params.id).pipe(
      switchMap(() => this.hasDeck(route.params.id))
    );
  }

  hasDeck(id: string): Observable<boolean> {
    return this.store.select(fromStore.getDeckEntities).pipe(
      map((entities: { [key: string]: Deck }) => !!entities[id]),
      tap(deckExists => {
        if (!deckExists) {
          this.store.dispatch(
            new fromCoreStore.Go({ path: ['/d', 'default'] })
          );
        }
      }),
      take(1)
    );
  }

  checkStore(id: string): Observable<boolean> {
    return this.store.select(fromStore.getCurrentDeckId).pipe(
      map(currentId => currentId === id),
      tap(loaded => {
        if (!loaded) {
          this.store.dispatch(new fromStore.ActivateDeck(id));
        }
      }),
      filter(loaded => loaded),
      take(1)
    );
  }
}
