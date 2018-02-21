import { NgModule } from '@angular/core';
import { ServiceWorkerModule } from '@angular/service-worker';

import { CoreModule } from './core/core.module';
import { AppComponent } from './core/containers';
import { environment } from '../environments/environment';

@NgModule({
  imports: [
    CoreModule.forRoot(),
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
