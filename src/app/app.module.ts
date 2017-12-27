import { NgModule } from '@angular/core';

import { CoreModule } from './core/core.module'
import { AppComponent } from './core/containers';

@NgModule({
  imports: [
    CoreModule.forRoot()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
