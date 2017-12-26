import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { TimeAgoPipe } from '../pipes/time-ago.pipe';
import { AbbrevNumberPipe } from '../pipes/abbrev-number.pipe';
import { NavBarComponent } from './nav-bar/component';
import { SubredditDetailComponent } from './subreddit-detail/component';
import { PostDetailComponent } from './post-detail/component';

export const COMPONENTS = [
  NavBarComponent,
  SubredditDetailComponent,
  PostDetailComponent,
  AbbrevNumberPipe,
  TimeAgoPipe
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS
})
export class ComponentsModule {}
