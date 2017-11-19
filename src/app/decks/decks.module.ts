import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { ComponentsModule } from './components';
import { ViewDeckPage } from './containers/view-deck/page';
import { ViewSubredditPage } from './containers/view-subreddit/page';

import { reducers } from './reducers/index';
import { DeckEffects } from './effects/deck';
import { SubredditEffects } from './effects/subreddit';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: ':id', component: ViewDeckPage },
      { path: '', redirectTo: 'default', pathMatch: 'full' },
    ]),
    StoreModule.forFeature('decks', reducers),
    ComponentsModule,
    EffectsModule.forFeature([DeckEffects, SubredditEffects])
  ],
  declarations: [ViewDeckPage, ViewSubredditPage]
})
export class DecksModule { }
