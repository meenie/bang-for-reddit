import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';

import { SubredditModule } from '../subreddit/subreddit.module';
import { ViewDeckComponent } from './containers/view-deck.component';
import { reducers } from './reducers/index';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      { path: ':id', component: ViewDeckComponent },
      { path: '', redirectTo: 'default', pathMatch: 'full' },
    ]),
    StoreModule.forFeature('decks', reducers),
    SubredditModule
  ],
  exports: [RouterModule],
  declarations: [ViewDeckComponent]
})
export class DeckModule { }
