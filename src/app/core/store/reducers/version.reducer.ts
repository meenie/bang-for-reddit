import { environment } from '../../../../environments/environment';
import * as VersionActions from '../actions/version.action';

export interface State {
  version: string;
  isValid: boolean;
}

export const initialState: State = {
  version: environment.version,
  isValid: true
}

export function reducer(state = initialState, action: VersionActions.All): State {
  switch (action.type) {
    case VersionActions.VERIFY:
      return {
        ...state,
        isValid: action.payload == state.version
      }

    default:
      return state;
  }
}

export const getIsValid = (state: State) => state.isValid;
