import * as SubredditActions from '../actions/subreddit';

export interface State {
  id: string;
  loaded: boolean;
  loading: boolean;
  postIds: string[];
}

const initialState: State = {
  id: null,
  loaded: false,
  loading: false,
  postIds: [],
};

export function reducer(
  state = initialState,
  action: SubredditActions.Actions
): State {
  switch (action.type) {
    case SubredditActions.LOAD: {
      return {
        ...state,
        loading: true,
      };
    }

    case SubredditActions.LOAD_SUCCESS: {
      return {
        id: action.payload.id,
        loaded: true,
        loading: false,
        postIds: action.payload.posts.map(post => post.id),
      };
    }

    default: {
      return state;
    }
  }
}

export const getLoaded = (state: State) => state.loaded;

export const getLoading = (state: State) => state.loading;

export const getPostIds = (state: State) => state.postIds;

export const getId = (state: State) => state.id;