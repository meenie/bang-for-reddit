import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import * as fromContainers from './containers';
import * as fromComponents from './components';
import * as fromStore from './store';
import * as fromPipes from './pipes';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: ':id', component: fromContainers.ViewDeckComponent },
      { path: '', redirectTo: 'default', pathMatch: 'full' },
    ]),
    FormsModule,
    StoreModule.forFeature('decks', fromStore.reducers),
    EffectsModule.forFeature(fromStore.effects)
  ],
  declarations: [...fromContainers.components, ...fromComponents.components, ...fromPipes.pipes],
  exports: [...fromContainers.components, ...fromComponents.components, ...fromPipes.pipes]
})
export class DecksModule { }
