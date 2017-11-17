import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import {
  StoreRouterConnectingModule,
  RouterStateSerializer
} from '@ngrx/router-store'
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { Angulartics2Module } from 'angulartics2';
import { Angulartics2GoogleAnalytics } from 'angulartics2/ga';

import { CoreModule } from './core/core.module'
import { AppComponent } from './core/containers/app.component';
import { CustomRouterStateSerializer } from './shared/utils';
import { routes } from './routes';
import { reducers, metaReducers } from './reducers';
import { environment } from '../environments/environment';

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot([]),
    RouterModule.forRoot(routes, { useHash: true }),
    Angulartics2Module.forRoot([Angulartics2GoogleAnalytics]),
    StoreRouterConnectingModule,
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    CoreModule.forRoot()
  ],
  providers: [
    { provide: RouterStateSerializer, useClass: CustomRouterStateSerializer },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
