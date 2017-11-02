
import { Component, Input } from '@angular/core';
import { Post } from '../models/post';

@Component({
  selector: 'bfr-subreddit-detail',
  template: `
    <mat-list>
      <h3 mat-subheader *ngIf="loading">Loading...</h3>
      <div *ngIf="loaded && ! loading">
        <h3 mat-subheader>/r/{{ id }}</h3>
        <mat-list-item *ngFor="let post of posts">
          <mat-icon mat-list-icon>link</mat-icon>
          <h4 mat-line><strong>{{ post.score }}</strong> -- <a [href]="post.url" target="_blank" [title]="post.title">{{ post.title }}</a></h4>
          <p mat-line><a [href]="post.commentsUrl" target="_blank">{{ post.numComments }} Comments</a></p>
        </mat-list-item>
      </div>
    </mat-list>
  `
})
export class SubredditDetailComponent {
  @Input() id: string;
  @Input() loaded: boolean;
  @Input() loading: boolean;
  @Input() posts: Post[];
}