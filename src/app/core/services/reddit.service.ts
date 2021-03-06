import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, empty } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class RedditService {
  private REDDIT_URL = 'https://www.reddit.com';

  constructor(private http: HttpClient) {}

  getPosts(subredditParams: { id: string; type: string }): Observable<any> {
    const { id, type = 'rising' } = subredditParams;
    return this.http
      .get(
        `${this.REDDIT_URL}/r/${id}${
          type ? '/' + type : ''
        }.json?t=${(new Date()).getTime()}`
      )
      .pipe(
        catchError(err => empty()),
        map((subreddit: any) => {
          if (!subreddit) {
            return [];
          }

          return (
            subreddit.data.children
              // Fuuuuuuuck these guys in particular
              .filter(post => post.data.subreddit != 'The_Donald')
              .map((post, index) => {
                let url = post.data.url;
                if (post.data.media && post.data.media.reddit_video && post.data.media.reddit_video.fallback_url) {
                  url = post.data.media.reddit_video.fallback_url
                }
                return {
                  id: post.data.id,
                  order: index,
                  title: post.data.title,
                  url,
                  score: post.data.score,
                  subreddit: post.data.subreddit,
                  author: post.data.author,
                  thumbnail:
                    post.data.thumbnail.slice(0, 4) == 'http'
                      ? post.data.thumbnail
                      : '',
                  created: new Date(post.data.created_utc * 1000),
                  commentsUrl: `${this.REDDIT_URL}${post.data.permalink}`,
                  numComments: post.data.num_comments,
                  domain: post.data.domain,
                  domainUrl:
                    post.data.domain.slice(0, 5) == 'self.'
                      ? `${this.REDDIT_URL}/r/${post.data.subreddit}`
                      : `${this.REDDIT_URL}/domain/${post.data.domain}`
                };
              })
          );
        })
      );
  }
}
