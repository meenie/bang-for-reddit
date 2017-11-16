import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/d/default', pathMatch: 'full' },
  {
    path: 'd',
    loadChildren: './deck/deck.module#DeckModule'
  }
]
