export interface Post {
  id: string;
  title: string;
  url: string;
  commentsUrl: string;
  numComments: number;
  score: number;
  thumbnail: string;
  author: string;
  subreddit: string;
  created: Date;
}
