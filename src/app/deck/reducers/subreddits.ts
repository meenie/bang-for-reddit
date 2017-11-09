import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Subreddit } from '../models/subreddit';
import * as SubredditActions from '../actions/subreddit';

export interface State extends EntityState<Subreddit> {}

export const adapter: EntityAdapter<Subreddit> = createEntityAdapter<Subreddit>();

export const initialState: State = adapter.getInitialState();

export function reducer(
  state = initialState,
  action: SubredditActions.Actions
): State {
  switch (action.type) {
    case SubredditActions.LOAD_SUCCESS: {
      return adapter.addOne(action.payload, state);
    }

    default: {
      return state;
    }
  }
}
