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
import { services, LocalStorageService } from './services';
import { environment } from '../../environments/environment';
import { CustomRouterStateSerializer } from './utils/custom-router-state-serializer';

import { reducers, metaReducers, initialState, effects } from './store';

export function getInitialState() {
  return {
    ...LocalStorageService.loadInitialState(),
    ...initialState
  };
}

@NgModule({
  imports: [
    BrowserAnimationsModule,
    CommonModule,
    HttpClientModule,
    RouterModule.forRoot([
      {
        path: 'd',
        loadChildren: '../decks/decks.module#DecksModule'
      },
      { path: '**', redirectTo: '/d/default' },
    ]),
    StoreModule.forRoot(reducers, {
      metaReducers,
      initialState: getInitialState
    }),
    StoreRouterConnectingModule,
    EffectsModule.forRoot(effects),
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
      providers: services
    }
  }
}
