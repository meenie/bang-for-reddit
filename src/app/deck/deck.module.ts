import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';

import { ComponentsModule } from './components';
import { SubredditModule } from '../subreddit/subreddit.module';
import { ViewDeckComponent } from './containers/view-deck.component';
import { reducers } from './reducers/index';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: ':id', component: ViewDeckComponent },
      { path: '', redirectTo: 'default', pathMatch: 'full' },
    ]),
    StoreModule.forFeature('decks', reducers),
    ComponentsModule,
    SubredditModule
  ],
  declarations: [ViewDeckComponent]
})
export class DeckModule { }
