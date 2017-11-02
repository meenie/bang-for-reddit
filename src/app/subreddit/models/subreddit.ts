import { Post } from "./post";

export interface Subreddit {
  id: string;
  type: string;
  posts: Post[]
}