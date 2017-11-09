import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/d', pathMatch: 'full' },
  {
    path: 'd',
    loadChildren: './deck/deck.module#DeckModule'
  }
]
