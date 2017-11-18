import 'rxjs/add/operator/concatMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/toArray';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class RedditService {
  private API_PATH = 'https://www.reddit.com/r'

  constructor(private http: HttpClient) {}

  getSubreddit(subredditParams: any): Observable<any> {
    return this.http.get(`${this.API_PATH}/${subredditParams.id}/${(subredditParams.type || 'rising')}.json`).catch(err => {
      console.error(err);

      return Observable.of(false);
    })
  }
}
