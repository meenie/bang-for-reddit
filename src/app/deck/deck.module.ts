import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { ComponentsModule } from './components';
import { SubredditModule } from '../subreddit/subreddit.module';
import { ViewDeckComponent } from './containers/view-deck.component';
import { reducers } from './reducers/index';
import { DeckEffects } from './effects/deck';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: ':id', component: ViewDeckComponent },
      { path: '', redirectTo: 'default', pathMatch: 'full' },
    ]),
    StoreModule.forFeature('decks', reducers),
    ComponentsModule,
    EffectsModule.forFeature([DeckEffects]),
    SubredditModule
  ],
  declarations: [ViewDeckComponent]
})
export class DeckModule { }
