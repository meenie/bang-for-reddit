export interface Subreddit {
  id: string;
  type: string;
  loading: boolean;
  loaded: boolean;
  postIds: string[];
}
