import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

import { Post } from '../../models/post.model';

@Component({
  selector: 'bfr-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostDetailComponent {
  @Input() post: Post;
}
