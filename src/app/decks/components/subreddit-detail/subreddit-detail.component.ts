import {
  Component,
  Input,
  Output,
  ChangeDetectionStrategy
} from '@angular/core';
import { EventEmitter } from '@angular/core';

import { Post } from '../../models/post.model';
import { Subreddit } from '../../models/subreddit.model';

@Component({
  selector: 'bfr-subreddit-detail',
  templateUrl: './subreddit-detail.component.html',
  styleUrls: ['./subreddit-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SubredditDetailComponent {
  @Input() subreddit: Subreddit;
  @Input() posts: Post[];
  @Input() settings: { type: string };
  @Output() setType = new EventEmitter<{ subredditId: string; type: string }>();

  trackById(index, item) {
    return item.id;
  }

  onSetType(type: string) {
    this.setType.emit({ subredditId: this.subreddit.id, type });
  }
}
