import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreRouterConnectingModule, RouterStateSerializer } from '@ngrx/router-store';

import { Angulartics2Module } from 'angulartics2';
import { Angulartics2GoogleAnalytics } from 'angulartics2/ga';

import { AppComponent } from './components/app.component'
import { RedditService } from './services/reddit';
import { LocalStorageService } from './services/local-storage';
import { environment } from '../../environments/environment';
import { CustomRouterStateSerializer } from './utils/custom-router-state-serializer';

import { reducers, metaReducers } from './reducers';

export function getInitialState() {
  return LocalStorageService.loadInitialState();
}

@NgModule({
  imports: [
    BrowserAnimationsModule,
    CommonModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: '', redirectTo: '/d/default', pathMatch: 'full' },
      {
        path: 'd',
        loadChildren: '../decks/decks.module#DecksModule'
      }
    ], { useHash: true }),
    StoreModule.forRoot(reducers, {
      metaReducers,
      initialState: getInitialState
    }),
    StoreRouterConnectingModule,
    EffectsModule.forRoot([]),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    Angulartics2Module.forRoot([Angulartics2GoogleAnalytics])
  ],
  providers: [
    { provide: RouterStateSerializer, useClass: CustomRouterStateSerializer },
  ],
  declarations: [AppComponent]
})
export class CoreModule {
  static forRoot() {
    return {
      ngModule: CoreModule,
      providers: [
        RedditService,
        LocalStorageService
      ]
    }
  }
}
