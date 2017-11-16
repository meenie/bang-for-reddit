
import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

import { Post } from '../models/post';
import { Subreddit } from '../models/subreddit';

@Component({
  selector: 'bfr-subreddit-detail',
  templateUrl: './subreddit-detail.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SubredditDetailComponent {
  @Input() subreddit: {subreddit: Subreddit, posts: Post[]};

  trackById(index, item) {
    return item.id;
  }
}
