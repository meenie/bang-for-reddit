import { Component, OnDestroy } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { Angulartics2GoogleAnalytics } from 'angulartics2/ga';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';
import { timer } from 'rxjs/observable/timer';

import * as fromCore from '../../store';
import * as IdleActions from '../../store/actions/idle.action';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'bfr-app-root',
  template: `<router-outlet></router-outlet>`,
  host: {
    '(document:visibilitychange)': 'visibilitychange($event)'
  }
})
export class AppComponent implements OnDestroy {
  private updateChecker$: Subscription;
  private appUpdater$: Subscription;

  constructor(
    angulartics2GoogleAnalytics: Angulartics2GoogleAnalytics,
    private store: Store<fromCore.State>,
    private swUpdate: SwUpdate
  ) {

    if (environment.production) {
      this.appUpdater$ = this.swUpdate.available.subscribe(event => {
        if (event.type == 'UPDATE_AVAILABLE') {
          this.swUpdate.activateUpdate().then(() => document.location.reload());
        }
      });

      this.updateChecker$ = timer(5000, 30e3).subscribe(() => {
        this.swUpdate.checkForUpdate();
      });
    }
  }

  visibilitychange($event) {
    this.store.dispatch(new IdleActions.SetIdle(document.hidden));
  }

  ngOnDestroy() {
    if (environment.production) {
      this.updateChecker$.unsubscribe();
      this.appUpdater$.unsubscribe();
    }
  }
}
