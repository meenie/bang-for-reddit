import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { StoreModule } from '@ngrx/store';

import { SubredditModule } from '../subreddit/subreddit.module';
import { ViewDeckComponent } from './containers/view-deck.component';
import { reducers } from './reducers/index';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    RouterModule.forChild([
      { path: '', component: ViewDeckComponent },
    ]),
    StoreModule.forFeature('deck', reducers),
    SubredditModule
  ],
  declarations: [ViewDeckComponent]
})
export class DeckModule { }
