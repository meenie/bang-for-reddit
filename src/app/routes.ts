import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/r/all', pathMatch: 'full' },
  {
    path: 'r',
    loadChildren: './subreddit/subreddit.module#SubredditModule'
  }
]
