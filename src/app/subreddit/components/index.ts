import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimeAgoPipe } from '../pipes/time-ago.pipe';

import { MaterialModule } from '../../shared/material.module';
import { SubredditDetailComponent } from './subreddit-detail';

export const COMPONENTS = [
  SubredditDetailComponent
];

@NgModule({
  imports: [
    CommonModule,
    MaterialModule
  ],
  declarations: [...COMPONENTS, TimeAgoPipe],
  exports: COMPONENTS
})
export class ComponentsModule {}
