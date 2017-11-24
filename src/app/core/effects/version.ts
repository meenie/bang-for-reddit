import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { map, switchMap } from 'rxjs/operators';

import { VersionService } from '../services/version';
import * as VersionActions from '../actions/version';

@Injectable()
export class VersionEffects {
  @Effect()
  versionChecker$: Observable<Action> = this.actions$
    .ofType<VersionActions.Check>(VersionActions.CHECK)
    .pipe(
      switchMap(() => this.version.serverVersion().pipe(
        map(version => new VersionActions.Verify(version.version))
      ))
    )

  constructor(private actions$: Actions, private version: VersionService) {}
}
