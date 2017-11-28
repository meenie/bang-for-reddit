
import { Component, Input, Output, ChangeDetectionStrategy} from '@angular/core';
import { EventEmitter } from '@angular/core';

import { Post } from '../../models/post';
import { Subreddit } from '../../models/subreddit';

@Component({
  selector: 'bfr-subreddit-detail',
  templateUrl: './component.html',
  styleUrls: ['./component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SubredditDetailComponent {
  @Input() subreddit: Subreddit;
  @Input() posts: Post[];
  @Input() settings: { type: string; sort: string; };
  @Output() setType = new EventEmitter<{id: string; type: string}>();
  @Output() setSort = new EventEmitter<{id: string; sort: string}>();

  trackById(index, item) {
    return item.id;
  }

  onSetType(type: string) {
    this.setType.emit({id: this.subreddit.id, type});
  }

  onSetSort(sort: string) {
    this.setSort.emit({id: this.subreddit.id, sort});
  }
}
