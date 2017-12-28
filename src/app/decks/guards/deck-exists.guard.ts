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
    return this.checkStore(route.params.id);
  }

  checkStore(id: string): Observable<boolean> {
    return this.store.select(fromStore.getDeckEntities).pipe(
      map(allDecks => !!allDecks[id]),
      tap(exists => {
        if (exists) {
          this.store.dispatch(new fromStore.ActivateDeck(id));
        } else {
          this.store.dispatch(
            new fromCoreStore.Go({ path: ['/d', 'default'] })
          );
        }
      }),
      take(1)
    );
  }
}
