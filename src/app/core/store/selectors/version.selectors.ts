import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromVersion from '../reducers/version.reducer';

export const getIsVersionValid = createSelector(
  fromFeature.getVersionState,
  fromVersion.getIsValid
);
