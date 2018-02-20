import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { empty } from 'rxjs/observable/empty';
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
        }.json`
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
              .map(post => {
                const score = post.data.score;
                let highlightLevel;

                if (type == 'rising' && score >= 100 && score < 200) {
                  highlightLevel = 'medium';
                } else if (type == 'rising' && score >= 200) {
                  highlightLevel = 'high';
                } else {
                  highlightLevel = 'low';
                }

                return {
                  id: post.data.id,
                  title: post.data.title,
                  url: post.data.url,
                  score,
                  highlightLevel,
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
