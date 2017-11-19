import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { TimeAgoPipe } from '../pipes/time-ago.pipe';
import { NavBarComponent } from './nav-bar/component';
import { SubredditDetailComponent } from './subreddit-detail/component';

export const COMPONENTS = [
  NavBarComponent,
  SubredditDetailComponent
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  declarations: [...COMPONENTS, TimeAgoPipe],
  exports: COMPONENTS
})
export class ComponentsModule {}
