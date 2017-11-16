import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TimeAgoPipe } from 'time-ago-pipe';

import { MaterialModule } from '../../shared/material.module';
import { SubredditDetailComponent } from './subreddit-detail';

export const COMPONENTS = [
  SubredditDetailComponent,
  TimeAgoPipe
];

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS
})
export class ComponentsModule {}