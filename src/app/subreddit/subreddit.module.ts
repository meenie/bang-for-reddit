import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { ComponentsModule } from './components'
import { SubredditEffects } from './effects/subreddit';
import { ViewSubredditPageComponent } from './containers/view-subreddit-page';

import { RedditService } from '../core/services/reddit';
import { reducers } from './reducers';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('subreddit', reducers),
    EffectsModule.forFeature([SubredditEffects]),
    ComponentsModule,
  ],
  declarations: [
    ViewSubredditPageComponent
  ],
  providers: [RedditService],
  exports: [ViewSubredditPageComponent]
})
export class SubredditModule {}
