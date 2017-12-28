import { environment } from '../../../../environments/environment';
import * as fromVersion from '../actions/version.action';

export interface State {
  version: string;
  isValid: boolean;
}

export const initialState: State = {
  version: environment.version,
  isValid: true
};

export function reducer(
  state = initialState,
  action: fromVersion.VersionActions
): State {
  switch (action.type) {
    case fromVersion.VERIFY:
      return {
        ...state,
        isValid: action.payload == state.version
      };

    default:
      return state;
  }
}

export const getIsValid = (state: State) => state.isValid;
