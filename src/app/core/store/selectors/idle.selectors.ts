import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromIdle from '../reducers/idle.reducer';

export const getIsIdle = createSelector(
  fromFeature.getIdleState,
  fromIdle.getIsIdle
);
