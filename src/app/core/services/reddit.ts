import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class RedditService {
  private REDDIT_URL = 'https://www.reddit.com'

  constructor(private http: HttpClient) {}

  getPosts(subredditParams: {id: string, type: string}): Observable<any> {
    const { id, type = 'rising' } = subredditParams;
    return this.http
      .get(`${this.REDDIT_URL}/r/${id}${(type ? '/' + type : '')}.json?t=${(new Date()).getTime()}`)
      .pipe(
        catchError(err => of(false)),
        map((subreddit: any) => {
          if (! subreddit) {
            return []
          }

          return subreddit.data.children
            // Fuuuuuuuck these guys in particular
            .filter(post => post.data.subreddit != 'The_Donald')
            .map(post => ({
              id: post.data.id,
              title: post.data.title,
              url: post.data.url,
              score: post.data.score,
              subreddit: post.data.subreddit,
              author: post.data.author,
              thumbnail: post.data.thumbnail.slice(0, 4) == 'http' ? post.data.thumbnail : '',
              created: new Date(post.data.created_utc * 1000),
              commentsUrl: `${this.REDDIT_URL}${post.data.permalink}`,
              numComments: post.data.num_comments
            }))
        }),
      )
  }
}
