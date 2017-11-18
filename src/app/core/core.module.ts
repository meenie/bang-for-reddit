import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AppComponent } from './containers/app.component'
import { RedditService } from './services/reddit';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [AppComponent],
  exports: [AppComponent]
})
export class CoreModule {
  static forRoot() {
    return {
      ngModule: CoreModule,
      providers: [RedditService]
    }
  }
}
