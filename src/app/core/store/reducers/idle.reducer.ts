import { environment } from '../../../../environments/environment';
import * as fromIdle from '../actions/idle.action';

export interface State {
  isIdle: boolean;
}

export const initialState: State = {
  isIdle: false
};

export function reducer(
  state = initialState,
  action: fromIdle.IdleActions
): State {
  switch (action.type) {
    case fromIdle.SET_IDLE:
      return {
        ...state,
        isIdle: action.payload
      };

    default:
      return state;
  }
}

export const getIsIdle = (state: State) => state.isIdle;
