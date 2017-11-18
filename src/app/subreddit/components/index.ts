import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimeAgoPipe } from '../pipes/time-ago.pipe';

import { SubredditDetailComponent } from './subreddit-detail';

export const COMPONENTS = [
  SubredditDetailComponent
];

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [...COMPONENTS, TimeAgoPipe],
  exports: COMPONENTS
})
export class ComponentsModule {}
