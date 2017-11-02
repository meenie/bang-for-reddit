import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

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
  declarations: COMPONENTS,
  exports: COMPONENTS
})
export class ComponentsModule {}