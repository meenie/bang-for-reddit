import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import * as fromContainers from './containers';
import * as fromComponents from './components';
import * as fromStore from './store';
import * as fromPipes from './pipes';
import * as fromGuards from './guards';

const ROUTES: Routes = [
  {
    path: ':id',
    component: fromContainers.ViewDeckComponent,
    canActivate: [fromGuards.DeckExistsGuard]
  },
  {
    path: '',
    redirectTo: 'default',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    FormsModule,
    StoreModule.forFeature('decks', fromStore.reducers),
    EffectsModule.forFeature(fromStore.effects)
  ],
  providers: [...fromGuards.guards],
  declarations: [
    ...fromContainers.components,
    ...fromComponents.components,
    ...fromPipes.pipes
  ],
  exports: [
    ...fromContainers.components,
    ...fromComponents.components,
    ...fromPipes.pipes
  ]
})
export class DecksModule {}
