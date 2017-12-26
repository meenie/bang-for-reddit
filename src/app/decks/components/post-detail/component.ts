
import { Component, Input, ChangeDetectionStrategy} from '@angular/core';

import { Post } from '../../models/post';

@Component({
  selector: 'bfr-post-detail',
  templateUrl: './component.html',
  styleUrls: ['./component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostDetailComponent {
  @Input() post: Post;
}
