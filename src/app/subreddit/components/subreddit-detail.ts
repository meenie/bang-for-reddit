
import { Component, Input } from '@angular/core';

import { Post } from '../models/post';
import { Subreddit } from '../models/subreddit';

@Component({
  selector: 'bfr-subreddit-detail',
  template: `
    <mat-list>
      <h3 mat-subheader *ngIf="subreddit.subreddit.loading">Loading...</h3>
      <div *ngIf="subreddit.subreddit.loaded && ! subreddit.subreddit.loading">
        <h3 mat-subheader>/r/{{ subreddit.subreddit.id }}</h3>
        <mat-list-item *ngFor="let post of subreddit.posts">
          <mat-icon mat-list-icon>link</mat-icon>
          <h4 mat-line><strong>{{ post.score }}</strong> -- <a [href]="post.url" target="_blank" [title]="post.title">{{ post.title }}</a></h4>
          <p mat-line><a [href]="post.commentsUrl" target="_blank">{{ post.numComments }} Comments</a></p>
        </mat-list-item>
      </div>
    </mat-list>
  `
})
export class SubredditDetailComponent {
  @Input() subreddit: {subreddit: Subreddit, posts: Post[]};
}
