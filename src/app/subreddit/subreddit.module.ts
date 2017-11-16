import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { ComponentsModule } from './components'
import { SubredditEffects } from './effects/subreddit';
import { ViewSubredditPageComponent } from './containers/view-subreddit-page';
import { SelectedSubredditPage } from './containers/selected-subreddit-page';

import { RedditService } from '../core/services/reddit';
import { reducers } from './reducers';
import { MaterialModule } from '../shared/material.module';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('subreddit', reducers),
    EffectsModule.forFeature([SubredditEffects]),
    MaterialModule,
    ComponentsModule,
  ],
  declarations: [
    ViewSubredditPageComponent,
    SelectedSubredditPage
  ],
  providers: [RedditService],
  exports: [ViewSubredditPageComponent]
})
export class SubredditModule {}
