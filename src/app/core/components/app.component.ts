import { Component, OnInit } from '@angular/core';
import { Angulartics2GoogleAnalytics } from 'angulartics2/ga';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';
import { timer } from 'rxjs/observable/timer';
import { map, withLatestFrom } from 'rxjs/operators'

import * as fromCore from '../reducers';
import * as VersionActions from '../actions/version';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-root',
  template: `<router-outlet></router-outlet>`
})
export class AppComponent implements OnInit {
  private versionChecker$: Subscription;

  constructor(
    angulartics2GoogleAnalytics: Angulartics2GoogleAnalytics,
    private _store: Store<fromCore.State>
  ) {}

  ngOnInit() {
    const isValid$ = this._store.select(fromCore.getIsVersionValid);

    isValid$.subscribe(isValid => {
      if (! isValid) {
        window.location.reload();
      }
    });

    if (environment.production) {
      timer(0, 1000 * 30).pipe(
        withLatestFrom(isValid$),
        map(([_, isValid]) => {
          return isValid ? new VersionActions.Check() : undefined;
        })
      ).subscribe(this._store);
    }
  }
}
